import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './views/main/main.component';
import { ButtonModule } from 'primeng/button';
import { LevelComponent } from './views/level/level.component';

import { MonacoEditorModule, MONACO_PATH } from '@materia-ui/ngx-monaco-editor';


@NgModule({ 
  declarations: [
    MainComponent,
    LevelComponent,
  ],
  imports: [
    CommonModule,
    ButtonModule,
    MonacoEditorModule,
  ],
  providers: [
    {
      provide: MONACO_PATH,
      useValue: 'https://unpkg.com/monaco-editor@0.31.1/min/vs',
    },
  ],
})
export class GameModule { }
