import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IBoard, TBoard } from '../interfaces/boards.interface';
import { API_BOARDS } from '../../shared/constants';

function httpOptions() {
  return {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
}

@Injectable()
export class ApiBoardsService {
  constructor(private http: HttpClient) {}

  public getBoardRequest(id: string) {
    return this.http.get<TBoard>(`${API_BOARDS}/${id}`);
  }

  public getBoardsRequest() {
    return this.http.get<IBoard[]>(API_BOARDS);
  }

  public createBoardRequest(board: TBoard) {
    return this.http.post<IBoard>(API_BOARDS, board, httpOptions());
  }

  public updateBoardRequest(id: string, updatedBoard: TBoard) {
    return this.http.put<IBoard>(
      `${API_BOARDS}/${id}`,
      updatedBoard,
      httpOptions(),
    );
  }

  public deleteBoardRequest(id: string) {
    return this.http.delete(`${API_BOARDS}/${id}`);
  }
}
