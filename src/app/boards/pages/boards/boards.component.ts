import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BoardsService } from '../../services/boards.service';
import {
  IBoard,
  TBoard,
  TConfirmationModal,
} from '../../interfaces/boards.interface';
import { BoardsModalComponent } from '../../components/boards-modal/boards-modal.component';
// eslint-disable-next-line max-len
import { ConfirmationComponent } from '../../../shared/components/confirmation/confirmation.component';
import { RoutePaths } from '../../../shared/constants';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardsComponent {
  public boards$: Observable<IBoard[]> = this.boardsService.boards;

  public isLoading$: Observable<boolean> = this.boardsService.isLoading;

  constructor(
    private boardsService: BoardsService,
    private matDialog: MatDialog,
    private router: Router,
  ) {}

  onBoardClick(id: string): void {
    this.router.navigate([`${RoutePaths.boards}/${id}`]);
  }

  onClickDeleteBoard(event: MouseEvent, id: string): void {
    event.stopPropagation();
    const message = {
      title: 'Delete Board',
      description: 'Would you like to delete this Board?',
    };
    this.openDialog(message).subscribe((result) => {
      if (result) {
        this.boardsService.delete(id);
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
        this.boardsService.create(newBoard);
      }
    });
  }

  onClickUpdateBoard(event: MouseEvent, id: string): void {
    event.stopPropagation();
    const {
      board: { title, description },
      boardIndex,
    } = this.boardsService.getByIdForUpdate(id);
    const modalConfig: TConfirmationModal = {
      title,
      description,
      confirmationTitleText: 'Update the Board',
      confirmationButtonText: 'Update',
    };
    this.openModalWindow(modalConfig).subscribe((newBoard) => {
      if (newBoard) {
        this.boardsService.update(id, newBoard, boardIndex);
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
