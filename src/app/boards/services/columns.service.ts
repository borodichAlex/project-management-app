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
    private apiTasksService: ApiTasksService,
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

  public loadAll(boardId: string) {
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

  public put(
    boardId: string,
    column: TColumn,
    order?: number,
  ): Observable<TColumn> {
    return this.apiColumns.put(boardId, column, order);
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
    column: IColumnFull,
    task: ITask,
    order: number,
    previousId?: string,
  ) {
    const columnId = column.id;
    return this.apiTasksService
      .put(boardId, columnId, task, order)
      .subscribe(() => {
        const columnIndex: number = this.columnsData.value.findIndex(
          ({ id }) => id === columnId,
        );
        const taskIndex: number = column.tasks.findIndex(
          ({ id }) => id === task.id || id === previousId,
        );
        const { tasks } = column;
        const newItem = {
          ...tasks[taskIndex],
          order,
        };
        tasks.splice(taskIndex, 1, newItem);
        const currentColumn = {
          ...column,
          tasks,
        };
        const currentColumns: IColumnFull[] = [...this.columnsData.value];
        currentColumns.splice(columnIndex, 1, currentColumn);
        this.columnsData.next(currentColumns);
      });
  }
}
