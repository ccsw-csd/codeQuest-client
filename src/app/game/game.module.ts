import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './views/main/main.component';
import { ButtonModule } from 'primeng/button';
import { LevelComponent } from './views/level/level.component';

import {MonacoEditorModule} from '@dmlukichev/ngx-monaco-editor';

@NgModule({ 
  declarations: [
    MainComponent,
    LevelComponent
  ],
  imports: [
    CommonModule,
    ButtonModule,
    MonacoEditorModule.forRoot() // use forRoot() in main app module only.
  ]
})
export class GameModule { }
