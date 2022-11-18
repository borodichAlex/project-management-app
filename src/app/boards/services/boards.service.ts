import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IBoard, TBoard } from '../interfaces/boards.interface';
import { ApiBoardsService } from './api-boards.service';

@Injectable()
export class BoardsService {
  private boardsData$ = new BehaviorSubject<IBoard[]>([]);

  private isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(private apiBoards: ApiBoardsService) {
    this.loadAll(); // where loading this data?
  }

  public get boards$(): Observable<IBoard[]> {
    return this.boardsData$.asObservable();
  }

  public get isLoading(): Observable<boolean> {
    return this.isLoading$.asObservable();
  }

  public getByIdForUpdate(id: string): {
    board: IBoard;
    boardIndex: number;
  } {
    const boardIndex: number = this.boardsData$.value.findIndex(
      (board) => board.id === id,
    );
    const board: IBoard = this.boardsData$.value[boardIndex];

    return {
      board,
      boardIndex,
    };
  }

  public create(board: TBoard): void {
    this.apiBoards.create(board).subscribe((newBoard) => {
      const newBoards: IBoard[] = [...this.boardsData$.value, newBoard];
      this.boardsData$.next(newBoards);
    });
  }

  public update(id: string, board: TBoard, boardIndex: number): void {
    this.apiBoards.update(id, board).subscribe((newBoard) => {
      const currentBoards = [...this.boardsData$.value];
      currentBoards.splice(boardIndex, 1, newBoard);
      this.boardsData$.next(currentBoards);
    });
  }

  public delete(id: string): void {
    this.apiBoards.delete(id).subscribe(() => {
      const newBoards = this.boardsData$.value.filter(
        (board) => board.id !== id,
      );
      this.boardsData$.next(newBoards);
    });
  }

  private loadAll(): void {
    this.isLoading$.next(true);
    this.apiBoards.getAll().subscribe((boards) => {
      this.boardsData$.next(boards);
      this.isLoading$.next(false);
    });
  }
}
