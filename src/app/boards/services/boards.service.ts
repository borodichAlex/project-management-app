import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationComponent } from '../../shared/components/confirmation/confirmation.component';
import { BoardsModalComponent } from '../components/boards-modal/boards-modal.component';
import {
  IBoard,
  TBoard,
  TConfirmationModal,
} from '../interfaces/boards.interface';
import { ApiBoardsService } from './api-boards.service';

@Injectable()
export class BoardsService {
  public boardsSubject$ = new BehaviorSubject<IBoard[]>([]);

  public isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private matDialog: MatDialog,
    private apiBoards: ApiBoardsService,
  ) {}

  public getBoards() {
    this.isLoading$.next(true);
    this.apiBoards.getAll().subscribe((boards) => {
      this.boardsSubject$.next(boards);
      this.isLoading$.next(false);
    });
  }

  public createBoard() {
    const modalConfig: TConfirmationModal = {
      title: '',
      description: '',
      confirmationTitleText: 'Create new Board',
      confirmationButtonText: 'Create',
    };
    this.openModalWindow(modalConfig).subscribe((result) => {
      if (result) {
        const { title, description } = result;
        const board: TBoard = {
          title,
          description,
        };
        this.apiBoards.create(board).subscribe((newBoard) => {
          const newBoards: IBoard[] = [...this.boardsSubject$.value, newBoard];
          this.boardsSubject$.next(newBoards);
        });
      }
    });
  }

  public updateBoard(id: string) {
    const currentBoardIndex: number = this.boardsSubject$.value.findIndex(
      (board) => board.id === id,
    );
    const currentBoard: IBoard = this.boardsSubject$.value[currentBoardIndex];
    const modalConfig: TConfirmationModal = {
      title: currentBoard.title,
      description: currentBoard.description,
      confirmationTitleText: 'Update the Board',
      confirmationButtonText: 'Update',
    };
    this.openModalWindow(modalConfig).subscribe((result) => {
      if (result) {
        const updatedBoard: TBoard = {
          title: result.title,
          description: result.description,
        };
        this.apiBoards.update(id, updatedBoard).subscribe((boardForUpdate) => {
          const currentBoards = [...this.boardsSubject$.value];
          currentBoards.splice(currentBoardIndex, 1, boardForUpdate);
          this.boardsSubject$.next(currentBoards);
        });
      }
    });
  }

  public deleteBoard(id: string) {
    const message = {
      title: 'Delete Board',
      description: 'Would you like to delete this Board?',
    };
    this.openDialog(message).subscribe((result) => {
      if (result) {
        this.apiBoards.delete(id).subscribe(() => {
          const filteredBoards = this.boardsSubject$.value.filter(
            (board) => board.id !== id,
          );
          this.boardsSubject$.next(filteredBoards);
        });
      }
    });
  }

  private openModalWindow(data: TConfirmationModal): Observable<TBoard> {
    const dialogRef = this.matDialog.open(BoardsModalComponent, {
      width: '300px',
      data,
      disableClose: true,
    });

    return dialogRef.afterClosed();
  }

  private openDialog(message: TBoard): Observable<boolean> {
    const dialogRef = this.matDialog.open(ConfirmationComponent, {
      data: message,
    });

    return dialogRef.afterClosed();
  }
}
