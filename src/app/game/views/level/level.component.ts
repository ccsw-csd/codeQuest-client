import { Component,  OnInit} from '@angular/core';
import { filter, take } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { LevelMap } from '../../model/LevelMap';
import { MonacoEditorConstructionOptions, MonacoEditorLoaderService, MonacoStandaloneCodeEditor} from '@materia-ui/ngx-monaco-editor';
import { QuestService } from '../../services/quest.service';
import { ConfirmationService } from 'primeng/api';


@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.scss']
})
export class LevelComponent implements OnInit  {

  level: LevelMap = new LevelMap();
  editor: MonacoStandaloneCodeEditor;
  tabInfoZoneSelected: number = 0;
  loading: boolean = false;
  levelLoaded: boolean = false;
  originalCode: string = "";

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

  resetCode() : void {
    this.editor.setValue(this.level.originalCode);
    this.editor.setPosition({column: 5, lineNumber: 12})
    this.editor.focus();
  }

  clickRunButton() : void {

    let code = this.editor.getValue();

    this.questService.run(this.level.levelId, code).subscribe(
      data => {
        console.log(data);
      }
    );

  }
  



}
