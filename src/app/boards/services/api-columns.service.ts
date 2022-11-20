import { Injectable } from '@angular/core';
import { HttpClient, HttpStatusCode } from '@angular/common/http';
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

  public getById(boardId: string, columnId: string): Observable<IColumnFull> {
    return this.http.get<IColumnFull>(columnApi(boardId, columnId));
  }

  public create(boardId: string, column: TNewColumn): Observable<TColumn> {
    return this.http.post<TColumn>(columnApi(boardId), column);
  }

  public delete(
    boardId: string,
    columnId: string,
  ): Observable<HttpStatusCode.NoContent> {
    return this.http.delete<HttpStatusCode.NoContent>(
      columnApi(boardId, columnId),
    );
  }

  public put(
    boardId: string,
    item: TColumn,
    order: number,
  ): Observable<TColumn> {
    return this.http.put<TColumn>(columnApi(boardId, item.id), {
      title: item.title,
      order,
    });
  }
}
