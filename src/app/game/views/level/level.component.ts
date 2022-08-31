import { Component,  OnInit} from '@angular/core';
import { filter, take } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { LevelMap } from '../../model/LevelMap';
import { MonacoEditorConstructionOptions, MonacoEditorLoaderService, MonacoStandaloneCodeEditor} from '@materia-ui/ngx-monaco-editor';
import { QuestService } from '../../services/quest.service';


@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.scss']
})
export class LevelComponent implements OnInit  {

  level: LevelMap;
  editor: MonacoStandaloneCodeEditor;
  tabInfoZoneSelected: number = 0;
  
  /**
   * 
   */
  editorOptions: MonacoEditorConstructionOptions = {
    theme: 'vs-dark',
    language: 'typescript',
    automaticLayout: true,
    value: "", //this.level.originalCode,
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
  ) { 

    

  }

  editorInit(editor: MonacoStandaloneCodeEditor) {
    this.editor = editor;
    this.editor.setPosition({column: 6, lineNumber: 12})
    this.editor.focus();
  }
  
  registerLib(lib: string) {
    monaco.languages.typescript.typescriptDefaults.addExtraLib(lib);
  }
  
  ngOnInit(): void {
    var routeId = this.route.snapshot.paramMap.get('id');
    
    this.questService.getLevel(routeId).subscribe(data => {
      this.level = data;

      this.editorOptions.value = data.originalCode;

      this.monacoLoaderService.isMonacoLoaded$
      .pipe(
        filter(isLoaded => !!isLoaded),
        take(1)
      )
      .subscribe(() => {
        this.registerLib(data.lib);
        
      });

    });


  }

 

}
