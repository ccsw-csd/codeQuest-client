import { Component,  ElementRef,  OnInit, ViewChild} from '@angular/core';
import { filter, take } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { LevelMap } from '../../model/LevelMap';
import { MonacoEditorConstructionOptions, MonacoEditorLoaderService, MonacoStandaloneCodeEditor} from '@materia-ui/ngx-monaco-editor';
import { QuestService } from '../../services/quest.service';
import { ConfirmationService } from 'primeng/api';
import { EventPlayResult, RunResult, TurnRunResult } from '../../model/RunResult';


@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.scss']
})
export class LevelComponent implements OnInit  {

  @ViewChild('historyPanel') private historyPanelContainer: ElementRef;

  showMap : number[][] = [];

  level: LevelMap = new LevelMap();
  editor: MonacoStandaloneCodeEditor;
  tabInfoZoneSelected: number = 0;
  loading: boolean = false;
  levelLoaded: boolean = false;
  originalCode: string = "";

  
  runningCode: boolean = false;
  history: RunResult = null;
  
  historyEvents: EventPlayResult[] = [];
  playedEvents: EventPlayResult[] = [];
  playVelocity: number = 750;
  playedHeart: number = 100;
  lastHeartTimeout : any = null;
  playedHeartAnimation: string = "";

  /**
   * 
   */
  editorOptions: MonacoEditorConstructionOptions = {
    theme: 'vs-dark',
    language: 'typescript',
    automaticLayout: true,
    value: "",
    roundedSelection: true,
    autoIndent: 'full',
    minimap: {
      enabled: false
    }
  };  



  constructor(
    private route: ActivatedRoute,  
    private monacoLoaderService: MonacoEditorLoaderService,   
    private questService: QuestService,
    private confirmationService: ConfirmationService,
  ) { 
    
    this.loading = true;
    
    this.monacoLoaderService.isMonacoLoaded$
    .pipe(
      filter(isLoaded => !!isLoaded),
      take(1)
      )
      .subscribe(() => {
        this.loadLevel();
    });    

  }

  ngOnInit(): void {        
  }


  loadLevel(): void {
    var routeId = this.route.snapshot.paramMap.get('id');    
    this.questService.getLevel(routeId).subscribe(data => {
      
      this.level = data;
      this.showMap = data.map;
      this.configureEditor();
      this.loading = false;
      this.levelLoaded = true;
    });      
  }
  

  private configureEditor() : void  {        
    monaco.languages.typescript.typescriptDefaults.addExtraLib(this.level.lib);  
    this.editorOptions.value = this.level.originalCode;
  }  
  

  editorInit(editor: MonacoStandaloneCodeEditor) : void  {
    this.editor = editor;
    this.resetCode();
  }
  
  clickResetButton() : void {
    this.confirmationService.confirm({
      message: 'Si reseteas el código fuente, perderás el código actual.<br/>&nbsp;<br/> ¿Estás seguro que quieres resetear el código fuente?',
      acceptLabel: 'Sí',
      rejectLabel: 'No',
      header: 'Reseteo del código',
      accept: () => {
        this.resetCode();
      }
    });
  }

  changeInfoZone(tabIndex: number) : void {
    this.tabInfoZoneSelected = tabIndex;
  }

  resetCode() : void {
    this.editor.setValue(this.level.originalCode);
    this.editor.setPosition({column: 5, lineNumber: 12});
    this.playedHeart = 100;
    this.showMap = this.level.map;
    this.history = null;
    this.historyEvents = [];
    this.playedEvents = [];
    this.tabInfoZoneSelected = 0;

    this.editor.focus();
  }

  clickRunButton() : void {

    if (monaco.editor.getModelMarkers({}).length > 0) {

      this.confirmationService.confirm({
        message: 'El código fuente tiene errores y no puede ejecutarse.<br/>&nbsp;<br/>Revisa el código antes de ejecutarlo',
        header: 'Error de compilación',
        acceptLabel: 'Aceptar',
        rejectVisible: false
      });

      return;
    }

    let code = this.editor.getValue();

    this.tabInfoZoneSelected = 1;
    this.runningCode = true;
  

    this.questService.run(this.level.levelId, code).subscribe(
      data => {
        
        this.history = data;
        this.runningCode = false;
    
        this.extractHistoryEvents(this.history);
        this.playHistory(0);
      }
    );

  }

  

  focusEvent(event : EventPlayResult) : void {

    if (event == null) return;

    if (this.playedHeart != event.health) {

      this.playedHeartAnimation="scalein animation-duration-400 animation-iteration-2";
      if (this.lastHeartTimeout != null) clearTimeout(this.lastHeartTimeout);
      this.lastHeartTimeout = setTimeout(() => {
        this.playedHeartAnimation="";
        this.lastHeartTimeout = null;
      }, 800);
    }


    this.playedHeart = event.health;
    this.showMap = event.map;
  }

  blurEvent(): void {

    if (this.playedEvents == null) return;

    this.focusEvent(this.playedEvents[this.playedEvents.length-1]);
  }


  playHistory(frame : number) : void {

    if (this.historyEvents == null || frame > this.historyEvents.length) return;
    
    this.composeHistory(frame);

    setTimeout(() => {
      this.historyPanelContainer.nativeElement.scrollTop = this.historyPanelContainer.nativeElement.scrollHeight;
    }, 1);

    setTimeout(() => {
      this.playHistory(frame+1);    
    }, this.playVelocity);

  }


  extractHistoryEvents(history: RunResult) : void {

    this.historyEvents = [];
    if (history == null) return; 

    let turnIndex = 0;
    history.turns.forEach((turn) => {


      turn.events.forEach((event) => {

        let eventPlay : EventPlayResult = new EventPlayResult();

        eventPlay.turn = turnIndex;
        eventPlay.health = turn.health;
        eventPlay.map = turn.map;

        eventPlay.data = event.data;
        eventPlay.message = event.message;
        eventPlay.type = event.type;

        this.historyEvents.push(eventPlay);
      });

      turnIndex++;
    })

  }


  composeHistory(frame : number) : void {

    this.playedEvents = [];
    if (this.historyEvents == null) return; 

    this.playedEvents = this.historyEvents.slice(0, frame);
    if (this.playedEvents.length > 0) {

      this.focusEvent(this.playedEvents[this.playedEvents.length-1]);

      //this.showMap = this.playedEvents[this.playedEvents.length-1].map;
      //this.playedHeart = this.playedEvents[this.playedEvents.length-1].health;
    }

  }
  



}
