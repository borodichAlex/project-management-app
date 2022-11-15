import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiTasksService } from './api-tasks.service';
import { TTask, ITask } from '../interfaces/task.interface';
import { ColumnsService } from './columns.service';

@Injectable()
export class TasksService {
  private tasks$ = new BehaviorSubject<ITask[]>([]);

  constructor(
    private apiTasks: ApiTasksService,
    private columnsService: ColumnsService,
  ) {}

  public get tasks(): Observable<ITask[]> {
    return this.tasks$.asObservable();
  }

  public create(boardId: string, columnId: string, task: TTask): void {
    this.apiTasks.create(boardId, columnId, task).subscribe((newTask) => {
      const newTasks: ITask[] = [...this.tasks$.value, newTask];
      this.tasks$.next(newTasks);
    });
  }

  public delete(boardId: string, columnId: string, taskId: string): void {
    this.apiTasks.delete(boardId, columnId, taskId).subscribe(() => {
      this.columnsService.deleteTask(boardId, columnId, taskId);
    });
  }
}
