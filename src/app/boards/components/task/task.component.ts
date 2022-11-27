import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { TNewColumn } from '../../interfaces/column.interface';
import { ITask } from '../../interfaces/task.interface';
import { TasksService } from '../../services/tasks.service';
import {
  ConfirmationComponent,
  DialogData,
} from '../../../shared/components/confirmation/confirmation.component';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskComponent implements OnDestroy {
  @Input() boardId!: string;

  @Input() columnId!: string;

  @Input() task!: ITask;

  private subscription!: Subscription;

  constructor(
    private matDialog: MatDialog,
    private taskService: TasksService,
    private translate: TranslateService,
  ) {}

  public ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  public onClickDeleteTask(event: MouseEvent) {
    event.stopPropagation();
    const message: DialogData = {
      title: this.translate.instant('modal.delete.task.title'),
      description: this.translate.instant('modal.delete.task.description'),
    };
    this.subscription = this.openDialog(message).subscribe((response) => {
      if (response) {
        this.taskService.delete(this.boardId, this.columnId, this.task.id);
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
