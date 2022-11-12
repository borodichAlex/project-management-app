import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, mergeMap, Observable } from 'rxjs';
import {
  IColumnFull,
  TColumn,
  TNewColumn,
} from '../interfaces/column.interface';
import { ApiColumnsService } from './api-columns.service';

@Injectable()
export class ColumnsService {
  private columns$ = new BehaviorSubject<TColumn[]>([]);

  private isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(private apiColumns: ApiColumnsService) {}

  public loadAll(boardId: string): void {
    this.isLoading$.next(true);
    this.apiColumns
      .getAll(boardId)
      .pipe(
        mergeMap((column) => {
          const arr: Observable<IColumnFull>[] = column.map((item) =>
            this.apiColumns.getAllById(boardId, item.id),
          );
          return forkJoin(arr);
        }),
      )
      .subscribe((columns: IColumnFull[]) => {
        // eslint-disable-next-line no-console
        console.log('columns:', columns);
        this.columns$.next(columns);
        this.isLoading$.next(false);
      });
  }

  public get columns(): Observable<TColumn[]> {
    return this.columns$.asObservable();
  }

  public get isLoading(): Observable<boolean> {
    return this.isLoading$.asObservable();
  }

  public create(column: TNewColumn, boardId: string): void {
    this.apiColumns.create(boardId, column).subscribe((newColumn) => {
      const newColumns: TColumn[] = [...this.columns$.value, newColumn];
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
}
