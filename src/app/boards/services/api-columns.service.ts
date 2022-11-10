import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { columnApi } from '../../shared/constants';
import { TColumn } from '../interfaces/column.interface';

@Injectable()
export class ApiColumnsService {
  constructor(private http: HttpClient) {}

  public getAll(boardId: string) {
    return this.http.get<TColumn[]>(columnApi(boardId));
  }
}
