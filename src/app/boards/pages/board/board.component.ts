import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { TranslateService } from '@ngx-translate/core';
import { ColumnsService } from '../../services/columns.service';
import {
  IColumnFull,
  TConfirmationModal,
  TNewColumn,
} from '../../interfaces/column.interface';

import { ColumnsModalComponent } from '../../modals/columns/columns-modal.component';
import { MODAL_WIDTH } from '../../../shared/constants';
import { BoardsService } from '../../services/boards.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent implements OnInit, OnDestroy {
  public boardId: string = this.route.snapshot.params['id'];

  public boardTitle!: string;

  public columns$!: Observable<IColumnFull[]>;

  public isLoading$!: Observable<boolean>;

  private subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private boardsService: BoardsService,
    private columnsService: ColumnsService,
    private matDialog: MatDialog,
    private translate: TranslateService,
  ) {}

  public ngOnInit(): void {
    this.isLoading$ = this.columnsService.isLoading$;
    this.subscription.add(this.columnsService.loadAll(this.boardId));
    this.columns$ = this.columnsService.columns$;
    this.subscription.add(
      this.boardsService.boards$.subscribe((boards) => {
        const currentBoard = boards.find((board) => board.id === this.boardId);
        if (currentBoard) {
          this.boardTitle = currentBoard.title;
        }
      }),
    );
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public onClickCreateColumn(): void {
    const modalConfig: TConfirmationModal = {
      title: '',
      confirmationTitleText: this.translate.instant(
        'modal.confirmationTitleText.createColumn',
      ),
      confirmationButtonText: this.translate.instant('modal.buttons.create'),
    };
    this.openModalWindow(modalConfig).subscribe((newColumn) => {
      if (newColumn) {
        this.columnsService.create(newColumn, this.boardId);
      }
    });
  }

  // eslint-disable-next-line class-methods-use-this
  public drop(event: CdkDragDrop<IColumnFull[]>) {
    moveItemInArray(
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );
    const currentOrder = event.currentIndex + 1;
    this.subscription.add(
      this.columnsService.updateOrder(
        this.boardId,
        event.container.data,
        event.item.data,
        currentOrder,
      ),
    );
  }

  // TODO: add to confirmation modal (shared module)
  private openModalWindow(data: TConfirmationModal): Observable<TNewColumn> {
    const dialogRef = this.matDialog.open(ColumnsModalComponent, {
      width: MODAL_WIDTH,
      data,
      disableClose: true,
    });
    return dialogRef.afterClosed();
  }
}
