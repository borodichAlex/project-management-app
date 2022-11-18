import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  IColumnFull,
  TColumn,
  TNewColumn,
} from '../interfaces/column.interface';
import { columnApi } from '../../shared/utils/api';

@Injectable()
export class ApiColumnsService {
  constructor(private http: HttpClient) {}

  public getAll(boardId: string): Observable<TColumn[]> {
    return this.http.get<TColumn[]>(columnApi(boardId));
  }

  public getAllById(
    boardId: string,
    columnId: string,
  ): Observable<IColumnFull> {
    return this.http.get<IColumnFull>(columnApi(boardId, columnId));
  }

  public create(boardId: string, column: TNewColumn): Observable<IColumnFull> {
    return this.http.post<IColumnFull>(columnApi(boardId), column);
  }

  public delete(boardId: string, columnId: string): Observable<Object> {
    return this.http.delete(columnApi(boardId, columnId));
  }

  public put(boardId: string, item: TColumn, order: number) {
    return this.http.put(columnApi(boardId, item.id), {
      title: item.title,
      order,
    });
  }
}
