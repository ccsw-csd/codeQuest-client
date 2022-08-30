import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { QuestStatus } from '../model/QuestStatus';

@Injectable({
  providedIn: 'root'
})
export class QuestService {

  constructor(
    private http: HttpClient,
  ) {}


  getStatus(): Observable<QuestStatus> {
    return this.http.get<QuestStatus>(environment.server + '/quest/status');
  }

}
