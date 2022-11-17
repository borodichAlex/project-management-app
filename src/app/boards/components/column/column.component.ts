import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { IColumnFull, TNewColumn } from '../../interfaces/column.interface';
import { ColumnsService } from '../../services/columns.service';
// eslint-disable-next-line max-len
import { ConfirmationComponent } from '../../../shared/components/confirmation/confirmation.component';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ColumnComponent {
  @Input() column!: IColumnFull;

  @Input() boardId!: string;

  isShowTitleInput: boolean = false;

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

  // eslint-disable-next-line class-methods-use-this
  onClickTitle() {
    // eslint-disable-next-line no-console
    console.log('title click');
    this.isShowTitleInput = !this.isShowTitleInput;
  }

  onClickButtonCloseInput() {
    this.isShowTitleInput = false;
  }

  // eslint-disable-next-line class-methods-use-this
  onClickButtonDoneInput(value: string) {
    // eslint-disable-next-line no-console
    console.log('title:', value);
  }
}
