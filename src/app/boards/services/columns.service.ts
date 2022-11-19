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
import { ApiColumnsService } from './api-columns.service';

@Injectable()
export class ColumnsService {
  private columnsData = new BehaviorSubject<IColumnFull[]>([]);

  private isLoading = new BehaviorSubject<boolean>(false);

  constructor(private apiColumns: ApiColumnsService) {}

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
            columns.map((item) => this.apiColumns.getAllById(boardId, item.id)),
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
      const newColumns = [...this.columnsData.value, newColumn];
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

  public refreshAll(boardId: string): Subscription {
    return this.apiColumns
      .getAll(boardId)
      .pipe(
        mergeMap((columns) => {
          if (!columns.length) return of([]);

          return forkJoin(
            columns.map((item) => this.apiColumns.getAllById(boardId, item.id)),
          );
        }),
      )
      .subscribe((columns: IColumnFull[]) => {
        this.columnsData.next(columns);
      });
  }

  public put(
    boardId: string,
    item: TColumn,
    order: number,
  ): Observable<IColumnFull> {
    return this.apiColumns.put(boardId, item, order);
  }
}
