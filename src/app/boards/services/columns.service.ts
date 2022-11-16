import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, mergeMap, Observable } from 'rxjs';
import { IColumnFull, TNewColumn } from '../interfaces/column.interface';
import { ITask } from '../interfaces/task.interface';
import { ApiColumnsService } from './api-columns.service';

@Injectable()
export class ColumnsService {
  private columns$ = new BehaviorSubject<IColumnFull[]>([]);

  private isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(private apiColumns: ApiColumnsService) {}

  public loadAll(boardId: string): void {
    this.isLoading$.next(true);
    this.apiColumns
      .getAll(boardId)
      .pipe(
        mergeMap((columns) => {
          if (!columns.length) {
            this.columns$.next([]);
            this.isLoading$.next(false);
          }
          const arr: Observable<IColumnFull>[] = columns.map((item) =>
            this.apiColumns.getAllById(boardId, item.id),
          );

          return forkJoin(arr);
        }),
      )
      .subscribe((columns: IColumnFull[]) => {
        this.columns$.next(columns);
        this.isLoading$.next(false);
      });
  }

  public get columns(): BehaviorSubject<IColumnFull[]> {
    return this.columns$;
  }

  public get columnsArr(): IColumnFull[] {
    return this.columns$.value;
  }

  public get isLoading(): Observable<boolean> {
    return this.isLoading$.asObservable();
  }

  public create(column: TNewColumn, boardId: string): void {
    this.apiColumns.create(boardId, column).subscribe((newColumn) => {
      const newColumns: IColumnFull[] = [...this.columns$.value, newColumn];
      this.columns$.next(newColumns);
    });
  }

  public delete(columnId: string, boardId: string): void {
    this.apiColumns.delete(boardId, columnId).subscribe(() => {
      const newColumns = this.columns$.value.filter(
        (column) => column.id !== columnId,
      );
      this.columns$.next(newColumns);
    });
  }

  public createTask(columnId: string, newTask: ITask) {
    const newColumns: IColumnFull[] = this.columns$.value.map((column) => {
      if (column.id !== columnId) {
        return column;
      }
      column.tasks.push(newTask);
      const newColumn = {
        ...column,
        tasks: column.tasks,
      };

      return newColumn;
    });
    this.columns$.next(newColumns);
  }
}
