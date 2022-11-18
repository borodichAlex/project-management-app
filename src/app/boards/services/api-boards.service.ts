import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IBoard, TBoard } from '../interfaces/boards.interface';
import { API_BOARDS } from '../../shared/constants';

// TODO: add return value
@Injectable()
export class ApiBoardsService {
  constructor(private http: HttpClient) {}

  public getById(id: string): Observable<TBoard> {
    return this.http.get<TBoard>(`${API_BOARDS}/${id}`);
  }

  public getAll(): Observable<IBoard[]> {
    return this.http.get<IBoard[]>(API_BOARDS);
  }

  public create(board: TBoard) {
    return this.http.post<IBoard>(API_BOARDS, board);
  }

  public update(id: string, updatedBoard: TBoard) {
    return this.http.put<IBoard>(`${API_BOARDS}/${id}`, updatedBoard);
  }

  public delete(id: string): Observable<Object> {
    return this.http.delete(`${API_BOARDS}/${id}`);
  }
}
