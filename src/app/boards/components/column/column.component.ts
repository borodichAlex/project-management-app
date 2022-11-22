import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { IColumnFull, TNewColumn } from '../../interfaces/column.interface';
import { ColumnsService } from '../../services/columns.service';
// eslint-disable-next-line max-len
import { ConfirmationComponent } from '../../../shared/components/confirmation/confirmation.component';
import { TTask, TTaskConfirmationModal } from '../../interfaces/task.interface';
import { UserStateService } from '../../../core/services/user-state.service';
import { TasksModalComponent } from '../../modals/tasks/tasks-modal.component';
import { MODAL_WIDTH } from '../../../shared/constants';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnComponent {
  @Input() column!: IColumnFull;

  @Input() boardId!: string;

  isShowTitleInput: boolean = false;

  constructor(
    private columnsService: ColumnsService,
    private matDialog: MatDialog,
    private userStateService: UserStateService,
    private tasksService: TasksService,
  ) {}

  public onClickDeleteColumn(event: MouseEvent) {
    event.stopPropagation();
    const message = {
      title: 'Delete Column',
      description: 'Would you like to delete this Column?',
    };
    this.openDialog(message).subscribe((result) => {
      if (result) {
        this.columnsService.delete(this.column.id, this.boardId);
      }
    });
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

  private openDialog(message: TNewColumn): Observable<boolean> {
    const dialogRef = this.matDialog.open(ConfirmationComponent, {
      data: message,
    });

    return dialogRef.afterClosed();
  }

  private openModalWindow(data: TTaskConfirmationModal): Observable<TTask> {
    const dialogRef = this.matDialog.open(TasksModalComponent, {
      width: MODAL_WIDTH,
      data,
      disableClose: true,
    });

    return dialogRef.afterClosed();
  }

  public onClickTitle() {
    this.isShowTitleInput = true;
  }

  public onClickButtonCloseInput() {
    this.isShowTitleInput = false;
  }

  public onClickButtonDoneInput(value: string) {
    const { id, order } = this.column;
    const newColumn = {
      id,
      title: value,
      order,
    };
    this.columnsService.update(newColumn, this.boardId);
    this.isShowTitleInput = false;
  }
}
