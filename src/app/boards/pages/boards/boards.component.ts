import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { BoardsService } from '../../services/boards.service';
import {
  IBoard,
  TBoard,
  TConfirmationModal,
} from '../../interfaces/boards.interface';
import { BoardsModalComponent } from '../../components/boards-modal/boards-modal.component';
// eslint-disable-next-line max-len
import { ConfirmationComponent } from '../../../shared/components/confirmation/confirmation.component';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardsComponent implements OnInit {
  public boards$: Observable<IBoard[]> = this.boardsService.boards;

  public isLoading$: Observable<boolean> = this.boardsService.isLoading;

  constructor(
    private boardsService: BoardsService,
    private matDialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.boardsService.getBoards();
  }

  onClickDeleteBoard(id: string): void {
    const message = {
      title: 'Delete Board',
      description: 'Would you like to delete this Board?',
    };
    this.openDialog(message).subscribe((result) => {
      if (result) {
        this.boardsService.deleteBoard(id);
      }
    });
  }

  onClickCreateBoard(): void {
    const modalConfig: TConfirmationModal = {
      title: '',
      description: '',
      confirmationTitleText: 'Create new Board',
      confirmationButtonText: 'Create',
    };
    this.openModalWindow(modalConfig).subscribe((newBoard) => {
      if (newBoard) {
        this.boardsService.createBoard(newBoard);
      }
    });
  }

  onClickUpdateBoard(id: string): void {
    const {
      board: { title, description },
      boardIndex,
    } = this.boardsService.getBoardById(id);
    const modalConfig: TConfirmationModal = {
      title,
      description,
      confirmationTitleText: 'Update the Board',
      confirmationButtonText: 'Update',
    };
    this.openModalWindow(modalConfig).subscribe((newBoard) => {
      if (newBoard) {
        this.boardsService.updateBoard(id, newBoard, boardIndex);
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
