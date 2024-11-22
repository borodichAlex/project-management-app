import { Injectable } from '@angular/core';
import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBoard, TBoard } from '../interfaces/boards.interface';
import { ENDPOINTS, SERVER_URL } from '../../shared/constants';

@Injectable()
export class ApiBoardsService {
  constructor(private http: HttpClient) {}

  public getById(id: string): Observable<TBoard> {
    return this.http.get<TBoard>(`${SERVER_URL}/${ENDPOINTS.boards}/${id}`);
  }

  public getAll(): Observable<IBoard[]> {
    return this.http.get<IBoard[]>(`${SERVER_URL}/${ENDPOINTS.boards}`);
  }

  public create(board: TBoard): Observable<IBoard> {
    return this.http.post<IBoard>(`${SERVER_URL}/${ENDPOINTS.boards}`, board);
  }

  public update(id: string, updatedBoard: TBoard): Observable<IBoard> {
    return this.http.put<IBoard>(
      `${SERVER_URL}/${ENDPOINTS.boards}/${id}`,
      updatedBoard,
    );
  }

  public delete(id: string): Observable<HttpStatusCode.NoContent> {
    return this.http.delete<HttpStatusCode.NoContent>(
      `${SERVER_URL}/${ENDPOINTS.boards}/${id}`,
    );
  }
}
