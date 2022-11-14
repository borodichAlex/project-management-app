import { Injectable } from '@angular/core';
import { ApiTasksService } from './api-tasks.service';
import { TTask } from '../interfaces/task.interface';
import { ColumnsService } from './columns.service';

@Injectable()
export class TasksService {
  constructor(
    private apiTasks: ApiTasksService,
    private columnsService: ColumnsService,
  ) {}

  public create(boardId: string, columnId: string, task: TTask): void {
    this.apiTasks.create(boardId, columnId, task).subscribe((newTask) => {
      // eslint-disable-next-line no-console
      console.log('new task:', newTask);
    });
  }

  public delete(boardId: string, columnId: string, taskId: string): void {
    this.apiTasks.delete(boardId, columnId, taskId).subscribe(() => {
      this.columnsService.deleteTask(boardId, columnId, taskId);
    });
  }
}
