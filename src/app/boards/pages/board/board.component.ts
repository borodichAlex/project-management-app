import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { ColumnsService } from '../../services/columns.service';
import {
  TColumn,
  TNewColumn,
  TConfirmationModal,
} from '../../interfaces/column.interface';

import { ColumnsModalComponent } from '../../components/columns-modal/columns-modal.component';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent implements OnInit {
  boardId: string = this.route.snapshot.params['id'];

  columns$!: Observable<TColumn[]>;

  isLoading$!: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private columnsService: ColumnsService,
    private matDialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.isLoading$ = this.columnsService.isLoading;
    this.columnsService.loadAll(this.boardId);
    this.columns$ = this.columnsService.columns;
  }

  onClickCreateColumn(): void {
    const modalConfig: TConfirmationModal = {
      title: '',
      confirmationTitleText: 'Create new Column',
      confirmationButtonText: 'Create',
    };
    this.openModalWindow(modalConfig).subscribe((newBoard) => {
      if (newBoard) {
        this.columnsService.create(newBoard, this.boardId);
      }
    });
  }

  private openModalWindow(data: TConfirmationModal): Observable<TNewColumn> {
    const dialogRef = this.matDialog.open(ColumnsModalComponent, {
      width: '300px',
      data,
      disableClose: true,
    });
    return dialogRef.afterClosed();
  }

  timePeriods = [
    'Bronze age',
    'Iron age',
    'Middle ages',
    'Early modern period',
    'Long nineteenth century',
  ];

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.timePeriods, event.previousIndex, event.currentIndex);
    // console.log(event.item.element.nativeElement.innerText);
  }
}
