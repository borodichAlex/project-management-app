import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IBoard, TBoard } from '../interfaces/boards.interface';
import { ApiBoardsService } from './api-boards.service';

@Injectable()
export class BoardsService {
  private boards$ = new BehaviorSubject<IBoard[]>([]);

  private isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private apiBoards: ApiBoardsService) {}

  public get boards(): Observable<IBoard[]> {
    return this.boards$.asObservable();
  }

  public get isLoading(): Observable<boolean> {
    return this.isLoading$.asObservable();
  }

  public getBoards(): void {
    this.isLoading$.next(true);
    this.apiBoards.getAll().subscribe((boards) => {
      this.boards$.next(boards);
      this.isLoading$.next(false);
    });
  }

  public getBoardById(id: string): {
    board: IBoard;
    boardIndex: number;
  } {
    const boardIndex: number = this.boards$.value.findIndex(
      (board) => board.id === id,
    );
    const board: IBoard = this.boards$.value[boardIndex];

    return {
      board,
      boardIndex,
    };
  }

  public createBoard(board: TBoard): void {
    this.apiBoards.create(board).subscribe((newBoard) => {
      const newBoards: IBoard[] = [...this.boards$.value, newBoard];
      this.boards$.next(newBoards);
    });
  }

  public updateBoard(id: string, board: TBoard, boardIndex: number): void {
    this.apiBoards.update(id, board).subscribe((newBoard) => {
      const currentBoards = [...this.boards$.value];
      currentBoards.splice(boardIndex, 1, newBoard);
      this.boards$.next(currentBoards);
    });
  }

  public deleteBoard(id: string): void {
    this.apiBoards.delete(id).subscribe(() => {
      const newBoards = this.boards$.value.filter((board) => board.id !== id);
      this.boards$.next(newBoards);
    });
  }
}
