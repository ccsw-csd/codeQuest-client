import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LevelMap } from '../../model/LevelMap';
import { NgxEditorModel } from '@dmlukichev/ngx-monaco-editor';


@Component({
  selector: 'app-level',
  templateUrl: './level.component.html',
  styleUrls: ['./level.component.scss']
})
export class LevelComponent implements OnInit  {

  @ViewChild("editor") private editor: ElementRef<HTMLElement>;

  public code: string = 
`/**
 *
 * Comportamiento del jugador
 * 
 */
class Player {
    
    
  play(warrior) {

    //TODO Implementa logica del jugador

  }
    
}`;

  public codeEditorOptions = {
    theme: 'vs-dark',
    language: 'javascript',
    automaticLayout: true
  };

  model: NgxEditorModel = {
    value: this.code,
    language: 'javascript',
  };

  level : LevelMap = {
    name: 'Level 1',
    quest: {
      id: 1,
      name: 'El Castillo de Javascript'
    },
    tiles : [
      ['wall-tl', 'wall-t', 'wall-t', 'wall-t', 'wall-t', 'wall-t', 'wall-t', 'wall-t', 'wall-t', 'wall-t', 'wall-tr'],
      [ 'wall-l', 'none', 'player', 'none', 'none', 'none', 'none', 'item-sword', 'none', 'ladder',  'wall-r'],
      ['wall-bl', 'wall-b', 'wall-b', 'wall-b', 'wall-b', 'wall-b', 'wall-b', 'wall-b', 'wall-b', 'wall-b', 'wall-br'],
    ]
  }


  constructor(
    private route: ActivatedRoute, 
  ) { }

  ngOnInit(): void {

    var routeId = this.route.snapshot.paramMap.get('id');
  }

 

}
