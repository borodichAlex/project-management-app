import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { UserStateService } from 'src/app/core/services/user-state.service';
import { IColumnFull, TNewColumn } from '../../interfaces/column.interface';
import { TTaskConfirmationModal, TTask } from '../../interfaces/task.interface';
import { ColumnsService } from '../../services/columns.service';
// eslint-disable-next-line max-len
import { ConfirmationComponent } from '../../../shared/components/confirmation/confirmation.component';
import { TasksModalComponent } from '../../modals/tasks/tasks-modal.component';
import { MODAL_WIDTH } from '../../../shared/constants';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ColumnComponent {
  @Input() column!: IColumnFull;

  @Input() boardId!: string;

  constructor(
    private columnsService: ColumnsService,
    private matDialog: MatDialog,
    private userStateService: UserStateService,
    private tasksService: TasksService,
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

  public onClickCreateTask(): void {
    const modalConfig: TTaskConfirmationModal = {
      title: '',
      description: '',
      userId: this.userStateService.user!.id,
      confirmationTitleText: 'Create new Task',
      confirmationButtonText: 'Create',
    };
    this.openModalWindow(modalConfig).subscribe((newTask) => {
      if (newTask) {
        this.tasksService.create(this.boardId, this.column.id, newTask);
      }
    });
  }

  private openModalWindow(data: TTaskConfirmationModal): Observable<TTask> {
    const dialogRef = this.matDialog.open(TasksModalComponent, {
      width: MODAL_WIDTH,
      data,
      disableClose: true,
    });

    return dialogRef.afterClosed();
  }
}
