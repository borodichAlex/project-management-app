import { Injectable } from '@angular/core';
import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBoard, IFullBoard, TBoard } from '../interfaces/boards.interface';
import { API_BOARDS } from '../../shared/constants';

@Injectable()
export class ApiBoardsService {
  constructor(private http: HttpClient) {}

  public getById(id: string): Observable<IFullBoard> {
    return this.http.get<IFullBoard>(`${API_BOARDS}/${id}`);
  }

  public getAll(): Observable<IBoard[]> {
    return this.http.get<IBoard[]>(API_BOARDS);
  }

  public create(board: TBoard): Observable<IBoard> {
    return this.http.post<IBoard>(API_BOARDS, board);
  }

  public update(id: string, updatedBoard: TBoard): Observable<IBoard> {
    return this.http.put<IBoard>(`${API_BOARDS}/${id}`, updatedBoard);
  }

  public delete(id: string): Observable<HttpStatusCode.NoContent> {
    return this.http.delete<HttpStatusCode.NoContent>(`${API_BOARDS}/${id}`);
  }
}
