import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BoardsService } from '../../services/boards.service';
import {
  IBoard,
  TBoard,
  TConfirmationModal,
} from '../../interfaces/boards.interface';
import { BoardsModalComponent } from '../../modals/boards/boards-modal.component';
// eslint-disable-next-line max-len
import { ConfirmationComponent } from '../../../shared/components/confirmation/confirmation.component';
import { MODAL_WIDTH, RoutePaths } from '../../../shared/constants';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardsComponent {
  public boards$: Observable<IBoard[]> = this.boardsService.boards$;

  public isLoading$: Observable<boolean> = this.boardsService.isLoading$;

  constructor(
    private boardsService: BoardsService,
    private matDialog: MatDialog,
    private router: Router,
    private translate: TranslateService,
  ) {}

  public onBoardClick(boardId: string): void {
    this.router.navigate([`${RoutePaths.boards}/${boardId}`]);
  }

  public onClickDeleteBoard(event: MouseEvent, id: string): void {
    event.stopPropagation();
    const message = {
      title: this.translate.instant('modal.delete.board.title'),
      description: this.translate.instant('modal.delete.board.description'),
    };
    this.openDialog(message).subscribe((result) => {
      if (result) {
        this.boardsService.delete(id);
      }
    });
  }

  public onClickUpdateBoard(event: MouseEvent, id: string): void {
    event.stopPropagation();
    const {
      board: { title, description },
      boardIndex,
    } = this.boardsService.getByIdForUpdate(id);
    const modalConfig: TConfirmationModal = {
      title,
      description,
      confirmationTitleText: this.translate.instant(
        'modal.confirmationTitleText.update',
      ),
      confirmationButtonText: this.translate.instant('modal.buttons.update'),
    };
    this.openModalWindow(modalConfig).subscribe((newBoard) => {
      if (newBoard) {
        this.boardsService.update(id, newBoard, boardIndex);
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

  private openDialog(message: TBoard): Observable<boolean> {
    const dialogRef = this.matDialog.open(ConfirmationComponent, {
      data: message,
    });

    return dialogRef.afterClosed();
  }
}
