import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ColumnsService } from '../../services/columns.service';
import {
  TColumn,
  TConfirmationModal,
  TNewColumn,
} from '../../interfaces/column.interface';

import { ColumnsModalComponent } from '../../components/columns-modal/columns-modal.component';
import { MODAL_WIDTH } from '../../../shared/constants';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent implements OnInit {
  public boardId: string = this.route.snapshot.params['id'];

  public columns$!: Observable<TColumn[]>;

  public isLoading$!: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private columnsService: ColumnsService,
    private matDialog: MatDialog,
  ) {}

  public ngOnInit(): void {
    this.isLoading$ = this.columnsService.isLoading;
    this.columnsService.loadAll(this.boardId);
    this.columns$ = this.columnsService.columns;
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

  public drop(event: CdkDragDrop<TColumn[]>) {
    // console.log(this.columnsService.columnsArr);
    moveItemInArray(
      this.columnsService.columnsArr,
      event.previousIndex,
      event.currentIndex,
    );
  }

  private openModalWindow(data: TConfirmationModal): Observable<TNewColumn> {
    const dialogRef = this.matDialog.open(ColumnsModalComponent, {
      width: MODAL_WIDTH,
      data,
      disableClose: true,
    });
    return dialogRef.afterClosed();
  }
}
