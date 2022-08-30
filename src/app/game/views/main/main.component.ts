import { Component, OnInit } from '@angular/core';
import { QuestStatus } from '../../model/QuestStatus';
import { QuestService } from '../../services/quest.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  constructor(
    private questService : QuestService,
  ) { }

  ngOnInit(): void {
    this.questService.getStatus().subscribe({
      next: (status: QuestStatus) => { 
        //TODO
      },
      error: () => {

      }
    });
  }

  start(): void {
    
  }

}
