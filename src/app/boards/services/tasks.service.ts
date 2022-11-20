import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiTasksService } from './api-tasks.service';
import { IColumnFull } from '../interfaces/column.interface';
import { ITask, ITaskPut, TTask } from '../interfaces/task.interface';
import { ColumnsService } from './columns.service';

@Injectable()
export class TasksService {
  constructor(
    private apiTasks: ApiTasksService,
    private columnsService: ColumnsService,
  ) {}

  public create(boardId: string, columnId: string, task: TTask): void {
    this.apiTasks.create(boardId, columnId, task).subscribe((newTask) => {
      // TODO: change map to find and replace
      const newColumns: IColumnFull[] = this.columnsService.columns.map(
        (column) => {
          if (column.id !== columnId) {
            return column;
          }
          const tasks = [...column.tasks, newTask];
          const newColumn = {
            ...column,
            tasks,
          };

          return newColumn;
        },
      );
      this.columnsService.setColumns(newColumns);
    });
  }

  public delete(boardId: string, columnId: string, taskId: string): void {
    this.apiTasks.delete(boardId, columnId, taskId).subscribe(() => {
      // TODO: change map to find and replace
      const newColumns: IColumnFull[] = this.columnsService.columns.map(
        (column) => {
          if (column.id !== columnId) {
            return column;
          }
          const newColumn = {
            ...column,
            tasks: column.tasks.filter((task) => task.id !== taskId),
          };

          return newColumn;
        },
      );
      this.columnsService.setColumns(newColumns);
    });
  }

  public put(
    boardId: string,
    columnId: string,
    task: ITask,
    order: number,
  ): Observable<ITaskPut> {
    return this.apiTasks.put(boardId, columnId, task, order);
  }
}
