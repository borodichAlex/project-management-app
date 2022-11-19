import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { IColumnFull, TNewColumn } from '../../interfaces/column.interface';
import { ColumnsService } from '../../services/columns.service';
// eslint-disable-next-line max-len
import { ConfirmationComponent } from '../../../shared/components/confirmation/confirmation.component';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnComponent implements OnDestroy {
  @Input() column!: IColumnFull;

  @Input() boardId!: string;

  isShowTitleInput: boolean = false;

  subscription: Subscription = new Subscription();

  constructor(
    private columnsService: ColumnsService,
    private matDialog: MatDialog,
  ) {}

  public onClickDeleteColumn(event: MouseEvent, boardId: string) {
    event.stopPropagation();
    const message = {
      title: 'Delete Column',
      description: 'Would you like to delete this Column?',
    };
    this.openDialog(message).subscribe((result) => {
      if (result) {
        this.columnsService.delete(this.column.id, boardId);
      }
    });
  }

  private openDialog(message: TNewColumn): Observable<boolean> {
    const dialogRef = this.matDialog.open(ConfirmationComponent, {
      data: message,
    });

    return dialogRef.afterClosed();
  }

  onClickTitle() {
    this.isShowTitleInput = true;
  }

  onClickButtonCloseInput() {
    this.isShowTitleInput = false;
  }

  onClickButtonDoneInput(value: string) {
    const { id, order } = this.column;
    const newColumn = {
      id,
      title: value,
      order,
    };
    this.subscription.add(this.columnsService.update(newColumn, this.boardId));
    this.isShowTitleInput = false;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
