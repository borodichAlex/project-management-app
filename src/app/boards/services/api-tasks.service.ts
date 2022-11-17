import { Injectable } from '@angular/core';
import { HttpClient, HttpStatusCode } from '@angular/common/http';
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

  public delete(
    boardId: string,
    columnId: string,
    taskId: string,
  ): Observable<HttpStatusCode.NoContent> {
    return this.http.delete<HttpStatusCode.NoContent>(
      taskApi(boardId, columnId, taskId),
    );
  }

  public put(
    boardId: string,
    columnId: string,
    task: ITask,
    currentIndex: number,
  ) {
    const currentOrder = currentIndex + 1;
    const response = this.http.put(taskApi(boardId, columnId, task.id), {
      title: task.title,
      order: currentOrder,
      description: task.description,
      userId: task.userId,
      boardId,
      columnId,
    });
    return response;
  }
}
