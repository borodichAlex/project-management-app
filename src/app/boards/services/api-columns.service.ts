import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { columnApi } from '../../shared/constants';
import { TColumn, TNewColumn } from '../interfaces/column.interface';

@Injectable()
export class ApiColumnsService {
  constructor(private http: HttpClient) {}

  public getAll(boardId: string) {
    return this.http.get<TColumn[]>(columnApi(boardId));
  }

  public create(column: TNewColumn, boardId: string) {
    return this.http.post<TColumn>(columnApi(boardId), column);
  }

  public delete(columnId: string, boardId: string) {
    return this.http.delete(columnApi(columnId, boardId));
  }
}
