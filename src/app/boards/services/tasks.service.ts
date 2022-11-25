import { ChangeDetectorRef, Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ApiTasksService } from './api-tasks.service';
import { IColumnFull } from '../interfaces/column.interface';
import { ITask, TTask } from '../interfaces/task.interface';
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

  public send(
    boardId: string,
    columnId: string,
    task: TTask,
  ): Observable<ITask> {
    return this.apiTasks.create(boardId, columnId, task);
  }

  public update(
    boardId: string,
    columnId: string,
    task: ITask,
    order: number,
    CDRefColumns: ChangeDetectorRef,
  ): Subscription {
    return this.apiTasks
      .update(boardId, columnId, task, order)
      .subscribe((updatedTask) => {
        const newTask: ITask = updatedTask;
        const columnIndex: number = this.columnsService.columns.findIndex(
          ({ id }) => id === columnId,
        );
        const currentColumn: IColumnFull =
          this.columnsService.columns[columnIndex];
        const taskIndex: number = currentColumn.tasks.findIndex(
          ({ id }) => id === task.id,
        );
        const copyColumns: IColumnFull[] = [...this.columnsService.columns];
        copyColumns[columnIndex].tasks.splice(taskIndex, 1, newTask);
        this.columnsService.setColumns(copyColumns);
        CDRefColumns.detectChanges();
      });
  }
}
