import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TTask, TTaskWithId } from '../interfaces/task.interface';
import { columnApi } from '../../shared/constants';

@Injectable()
export class ApiTasksService {
  constructor(private http: HttpClient) {}

  public create(
    boardId: string,
    columnId: string,
    task: TTask,
  ): Observable<TTaskWithId> {
    return this.http.post<TTaskWithId>(columnApi(boardId, columnId), task);
  }
}
