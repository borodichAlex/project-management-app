import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TTask, ITask } from '../interfaces/task.interface';
import { taskApi } from '../../shared/utils/api';

@Injectable()
export class ApiTasksService {
  constructor(private http: HttpClient) {}

  public create(
    boardId: string,
    columnId: string,
    task: TTask,
  ): Observable<ITask> {
    return this.http.post<ITask>(taskApi(boardId, columnId), task);
  }

  public delete(boardId: string, columnId: string, taskId: string) {
    return this.http.delete(taskApi(boardId, columnId, taskId));
  }
}
