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
    return this.http.delete(columnApi(boardId, columnId));
  }

  public put(boardId: string, item: TColumn, currentIndex: number) {
    const currentOrder = currentIndex + 1;
    const response = this.http.put(columnApi(boardId, item.id), {
      title: item.title,
      order: currentOrder,
    });
    // response.subscribe((x) => {
    //   console.log(x);
    // });
    return response;
  }
}
