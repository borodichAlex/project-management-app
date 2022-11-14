import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ITask } from '../../interfaces/task.interface';
import {
  ConfirmationComponent,
  DialogData,
} from '../../../shared/components/confirmation/confirmation.component';
import { TNewColumn } from '../../interfaces/column.interface';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent {
  @Input() boardId!: string;

  @Input() columnId!: string;

  @Input() task!: ITask;

  constructor(
    private matDialog: MatDialog,
    private taskService: TasksService,
  ) {}

  public onClickDeleteTask(
    event: MouseEvent,
    {
      boardId,
      columnId,
      taskId,
    }: {
      boardId: string;
      columnId: string;
      taskId: string;
    },
  ) {
    event.stopPropagation();
    const message: DialogData = {
      title: 'Delete Task',
      description: 'Would you like to delete this Task?',
    };
    this.openDialog(message).subscribe((response) => {
      if (response) {
        this.taskService.delete(boardId, columnId, taskId);
      }
    });
  }

  private openDialog(message: TNewColumn): Observable<boolean> {
    const dialogRef = this.matDialog.open(ConfirmationComponent, {
      data: message,
    });

    return dialogRef.afterClosed();
  }
}
