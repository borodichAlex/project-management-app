import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
import { SearchTaskService } from '../../services/search-task.service';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardsComponent implements OnInit, OnDestroy {
  public boards$: Observable<IBoard[]> = this.boardsService.boards$;

  public isLoading$: Observable<boolean> = this.boardsService.isLoading$;

  private subscription!: Subscription;

  constructor(
    private boardsService: BoardsService,
    private searchTaskService: SearchTaskService,
    private matDialog: MatDialog,
    private router: Router,
  ) {}

  public ngOnInit(): void {
    this.subscription = this.searchTaskService.initSearchTasksData();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public onBoardClick(boardId: string): void {
    this.router.navigate([`${RoutePaths.boards}/${boardId}`]);
  }

  public onClickDeleteBoard(event: MouseEvent, id: string): void {
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

  public onClickUpdateBoard(event: MouseEvent, id: string): void {
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
