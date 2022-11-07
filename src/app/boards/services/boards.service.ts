import { HttpClient, HttpHeaders } from '@angular/common/http';
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

const API_BOARDS = 'api/boards';

function httpOptions() {
  return {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
}

@Injectable({
  providedIn: 'root',
})
export class BoardsService {
  public boardsSubject$ = new BehaviorSubject<IBoard[]>([]);

  public isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private matDialog: MatDialog) {}

  private getBoard(id: string) {
    return this.http.get<TBoard>(`${API_BOARDS}/${id}`);
  }

  public getBoards() {
    this.isLoading$.next(true);
    this.http.get<IBoard[]>(API_BOARDS).subscribe((boards) => {
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
        this.http
          .post<IBoard>(API_BOARDS, board, httpOptions())
          .subscribe((newBoard) => {
            const newBoards: IBoard[] = [
              ...this.boardsSubject$.value,
              newBoard,
            ];
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
        this.http
          .put<IBoard>(`${API_BOARDS}/${id}`, updatedBoard, httpOptions())
          .subscribe((boardForUpdate) => {
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
        this.http.delete(`${API_BOARDS}/${id}`).subscribe(() => {
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
