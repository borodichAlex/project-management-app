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
import { Location } from '@angular/common';
import { ColumnsService } from '../../services/columns.service';
import {
  IColumnFull,
  TConfirmationModal,
  TNewColumn,
} from '../../interfaces/column.interface';

import { ColumnsModalComponent } from '../../modals/columns/columns-modal.component';
import { MODAL_WIDTH } from '../../../shared/constants';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent implements OnInit, OnDestroy {
  public boardId: string = this.route.snapshot.params['id'];

  public columns$!: Observable<IColumnFull[]>;

  public isLoading$!: Observable<boolean>;

  private subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private columnsService: ColumnsService,
    private matDialog: MatDialog,
    private location: Location,
  ) {}

  public ngOnInit(): void {
    this.isLoading$ = this.columnsService.isLoading$;
    this.subscriptions.push(this.columnsService.loadAll(this.boardId));
    this.columns$ = this.columnsService.columns$;
  }

  public ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }

  public onClickCreateColumn(): void {
    const modalConfig: TConfirmationModal = {
      title: '',
      confirmationTitleText: 'Create new Column',
      confirmationButtonText: 'Create',
    };
    this.openModalWindow(modalConfig).subscribe((newColumn) => {
      if (newColumn) {
        this.columnsService.create(newColumn, this.boardId);
      }
    });
  }

  public drop(event: CdkDragDrop<IColumnFull[]>) {
    moveItemInArray(
      this.columnsService.columns,
      event.previousIndex,
      event.currentIndex,
    );
    const currentOrder = event.currentIndex + 1;
    const subscription = this.columnsService
      .put(
        this.boardId,
        this.columnsService.columns[event.currentIndex],
        currentOrder,
      )
      .subscribe(() => {
        this.columnsService.refreshAll(this.boardId);
      });
    this.subscriptions.push(subscription);
  }

  public onClickBack() {
    this.location.back();
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
