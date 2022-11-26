import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import {
  IBoard,
  TBoard,
  TConfirmationModal,
} from '../interfaces/boards.interface';
import { ApiBoardsService } from './api-boards.service';
import { BoardsModalComponent } from '../modals/boards/boards-modal.component';
import { MODAL_WIDTH } from '../../shared/constants';

@Injectable()
export class BoardsService {
  private boardsData = new BehaviorSubject<IBoard[]>([]);

  private isLoading = new BehaviorSubject<boolean>(false);

  constructor(
    private apiBoards: ApiBoardsService,
    private matDialog: MatDialog,
  ) {
    this.loadAll(); // where loading this data?
  }

  public get boards$(): Observable<IBoard[]> {
    return this.boardsData.asObservable();
  }

  public get boards(): IBoard[] {
    return this.boardsData.getValue();
  }

  public get isLoading$(): Observable<boolean> {
    return this.isLoading.asObservable();
  }

  public createNewBoard(): void {
    const modalConfig: TConfirmationModal = {
      title: '',
      description: '',
      confirmationTitleText: 'Create new Board',
      confirmationButtonText: 'Create',
    };
    this.openModalWindow(modalConfig).subscribe((newBoard) => {
      if (newBoard) {
        this.create(newBoard);
      }
    });
  }

  private openModalWindow(data: TConfirmationModal): Observable<TBoard> {
    const dialogRef = this.matDialog.open(BoardsModalComponent, {
      width: MODAL_WIDTH,
      data,
      disableClose: true,
    });

    return dialogRef.afterClosed();
  }

  public getByIdForUpdate(id: string): {
    board: IBoard;
    boardIndex: number;
  } {
    const boardIndex: number = this.boardsData.value.findIndex(
      (board) => board.id === id,
    );
    const board: IBoard = this.boardsData.value[boardIndex];

    return {
      board,
      boardIndex,
    };
  }

  public create(board: TBoard): void {
    this.apiBoards.create(board).subscribe((newBoard) => {
      const newBoards: IBoard[] = [...this.boardsData.value, newBoard];
      this.boardsData.next(newBoards);
    });
  }

  public update(id: string, board: TBoard, boardIndex: number): void {
    this.apiBoards.update(id, board).subscribe((newBoard) => {
      const currentBoards = [...this.boardsData.value];
      currentBoards.splice(boardIndex, 1, newBoard);
      this.boardsData.next(currentBoards);
    });
  }

  public delete(id: string): void {
    this.apiBoards.delete(id).subscribe(() => {
      const newBoards = this.boardsData.value.filter(
        (board) => board.id !== id,
      );
      this.boardsData.next(newBoards);
    });
  }

  private loadAll(): void {
    this.isLoading.next(true);
    this.apiBoards.getAll().subscribe((boards) => {
      this.boardsData.next(boards);
      this.isLoading.next(false);
    });
  }
}
