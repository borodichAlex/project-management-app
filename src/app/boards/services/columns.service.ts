import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  forkJoin,
  mergeMap,
  Observable,
  of,
  Subscription,
} from 'rxjs';
import {
  IColumnFull,
  TColumn,
  TNewColumn,
} from '../interfaces/column.interface';
import { ITask } from '../interfaces/task.interface';
import { ApiColumnsService } from './api-columns.service';
import { ApiTasksService } from './api-tasks.service';

@Injectable()
export class ColumnsService {
  private columnsData = new BehaviorSubject<IColumnFull[]>([]);

  private isLoading = new BehaviorSubject<boolean>(false);

  constructor(
    private apiColumns: ApiColumnsService,
    private apiTasks: ApiTasksService,
  ) {}

  public get columns$(): Observable<IColumnFull[]> {
    return this.columnsData.asObservable();
  }

  public get columns(): IColumnFull[] {
    return this.columnsData.value;
  }

  public get isLoading$(): Observable<boolean> {
    return this.isLoading.asObservable();
  }

  public loadAll(boardId: string): Subscription {
    this.isLoading.next(true);
    return this.apiColumns
      .getAll(boardId)
      .pipe(
        mergeMap((columns) => {
          if (!columns.length) return of([]);

          return forkJoin(
            columns.map((item) => this.apiColumns.getById(boardId, item.id)),
          );
        }),
      )
      .subscribe((columns: IColumnFull[]) => {
        this.columnsData.next(columns);
        this.isLoading.next(false);
      });
  }

  public create(column: TNewColumn, boardId: string): void {
    this.apiColumns.create(boardId, column).subscribe((newColumn) => {
      const fullColumn = {
        ...newColumn,
        tasks: [],
      };
      const newColumns = [...this.columnsData.value, fullColumn];
      this.columnsData.next(newColumns);
    });
  }

  public delete(columnId: string, boardId: string): void {
    this.apiColumns.delete(boardId, columnId).subscribe(() => {
      const newColumns = this.columnsData.value.filter(
        (column) => column.id !== columnId,
      );
      this.columnsData.next(newColumns);
    });
  }

  public setColumns(newColumns: IColumnFull[]): void {
    this.columnsData.next(newColumns);
  }

  public updateOrder(
    boardId: string,
    updatedColumns: IColumnFull[],
    currentColumn: TColumn,
    order: number,
  ): Subscription {
    return this.apiColumns.put(boardId, currentColumn, order).subscribe(() => {
      const finishColumns = updatedColumns.map((column, index) => ({
        ...column,
        order: index + 1,
      }));
      this.columnsData.next(finishColumns);
    });
  }

  public updateTasks(
    boardId: string,
    currentColumn: IColumnFull,
    currentTask: ITask,
    order: number,
  ): Subscription {
    const columnId = currentColumn.id;
    return this.apiTasks
      .put(boardId, columnId, currentTask, order)
      .subscribe(() => {
        const updatedTasks = currentColumn.tasks.map((task, index) => ({
          ...task,
          order: index + 1,
        }));
        const columnIndex: number = this.columnsData.value.findIndex(
          ({ id }) => id === columnId,
        );
        const updatedColumn = {
          ...currentColumn,
          tasks: updatedTasks,
        };
        const updatedColumns: IColumnFull[] = this.columnsData.value;
        updatedColumns.splice(columnIndex, 1, updatedColumn);
        this.columnsData.next(updatedColumns);
      });
  }

  public update(newColumn: TColumn, boardId: string): Subscription {
    return this.apiColumns.put(boardId, newColumn).subscribe((column) => {
      const columnIndex: number = this.columnsData.value.findIndex(
        ({ id }) => id === column.id,
      );
      const currentColumns: IColumnFull[] = [...this.columnsData.value];
      const newItem = {
        ...currentColumns[columnIndex],
        title: column.title,
      };
      currentColumns.splice(columnIndex, 1, newItem);
      this.columnsData.next(currentColumns);
    });
  }
}
