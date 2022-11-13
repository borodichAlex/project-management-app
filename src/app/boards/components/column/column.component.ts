import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { IColumnFull, TNewColumn } from '../../interfaces/column.interface';
import { ColumnsService } from '../../services/columns.service';
// eslint-disable-next-line max-len
import { ConfirmationComponent } from '../../../shared/components/confirmation/confirmation.component';
import { TasksService } from '../../services/tasks.service';
import { UserStateService } from '../../../core/services/user-state.service';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnComponent {
  @Input() column!: IColumnFull;

  @Input() boardId!: string;

  constructor(
    private columnsService: ColumnsService,
    private matDialog: MatDialog,
    private tasksService: TasksService,
    private userStateService: UserStateService,
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
  public onClickCreateTask() {
    // eslint-disable-next-line no-console
    console.log('create task');
    /* console.log('user:', this.userStateService.user.id);
    const modalConfig: TTaskConfirmationModal = {
      title: '',
      description: '',
      userId: this.userStateService.user.id,
      confirmationTitleText: 'Create new Task',
      confirmationButtonText: 'Create',
    }; */
  }
}
