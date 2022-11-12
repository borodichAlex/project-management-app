import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TColumn, TNewColumn } from '../interfaces/column.interface';
import { ApiColumnsService } from './api-columns.service';

@Injectable()
export class ColumnsService {
  private columns$ = new BehaviorSubject<TColumn[]>([]);

  private isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(private apiColumns: ApiColumnsService) {}

  public loadAll(boardId: string): void {
    this.isLoading$.next(true);
    this.apiColumns.getAll(boardId).subscribe((columns) => {
      this.columns$.next(columns);
      console.log(boardId, columns);
      this.isLoading$.next(false);
    });
  }

  public get columns(): Observable<TColumn[]> {
    return this.columns$.asObservable();
  }

  public get columnsArr(): TColumn[] {
    return this.columns$.value;
  }

  public get isLoading(): Observable<boolean> {
    return this.isLoading$.asObservable();
  }

  public create(column: TNewColumn, boardId: string): void {
    this.apiColumns.create(column, boardId).subscribe((newColumn) => {
      const newColumns: TColumn[] = [...this.columns$.value, newColumn];
      this.columns$.next(newColumns);
    });
  }

  public delete(columnId: string, boardId: string): void {
    this.apiColumns.delete(columnId, boardId).subscribe(() => {
      const newColumns = this.columns$.value.filter(
        (column) => column.id !== columnId,
      );
      this.columns$.next(newColumns);
    });
  }
}
