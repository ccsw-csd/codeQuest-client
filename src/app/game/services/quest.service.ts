import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LevelMap } from '../model/LevelMap';
import { QuestStatus } from '../model/QuestStatus';
import { RunResult } from '../model/RunResult';


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

  getLevel(id: string): Observable<LevelMap> {
    return this.http.get<LevelMap>(environment.server + '/quest/level/'+id);
  }

  run(id: number, code: string): Observable<RunResult> {
    return this.http.post<RunResult>(environment.server + '/quest/level/'+id+'/run', {'code': code});
  }  

}
