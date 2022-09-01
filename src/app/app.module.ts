import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CoreModule } from './core/core.module';
import { LoginModule } from './login/login.module';
import { GameModule } from './game/game.module';


import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

import { MonacoEditorModule, MONACO_PATH } from '@materia-ui/ngx-monaco-editor';

registerLocaleData(localeEs,'es');

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MonacoEditorModule,
    CoreModule,
    LoginModule,
    GameModule,
  ],
  providers: [
    {
      provide: MONACO_PATH,
      //useValue: 'https://unpkg.com/monaco-editor@0.31.1/min/vs',
      useValue: './assets/monaco-editor/min/vs',
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
