import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  forkJoin,
  mergeMap,
  Observable,
  Subscription,
} from 'rxjs';
import {
  IColumnFull,
  TColumn,
  TNewColumn,
} from '../interfaces/column.interface';
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

  public update(newColumn: TColumn, boardId: string): Subscription {
    return this.apiColumns.put(boardId, newColumn).subscribe((column) => {
      const columnIndex: number = this.columns$.value.findIndex(
        ({ id }) => id === column.id,
      );
      const currentColumns: IColumnFull[] = [...this.columns$.value];
      const newItem = {
        ...currentColumns[columnIndex],
        title: column.title,
      };
      currentColumns.splice(columnIndex, 1, newItem);
      this.columns$.next(currentColumns);
    });
  }
}
