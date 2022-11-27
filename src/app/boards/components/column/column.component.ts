import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { TranslateService } from '@ngx-translate/core';
import {
  IColumnFull,
  IMoveTaskData,
  ITransferTaskData,
  TNewColumn,
} from '../../interfaces/column.interface';
import { ColumnsService } from '../../services/columns.service';
// eslint-disable-next-line max-len
import { ConfirmationComponent } from '../../../shared/components/confirmation/confirmation.component';
import {
  ITask,
  TTask,
  TTaskConfirmationModal,
} from '../../interfaces/task.interface';
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
export class ColumnComponent implements OnDestroy {
  @Input() column!: IColumnFull;

  @Input() boardId!: string;

  public isShowTitleInput: boolean = false;

  private subscription = new Subscription();

  constructor(
    private columnsService: ColumnsService,
    private matDialog: MatDialog,
    private userStateService: UserStateService,
    private tasksService: TasksService,
    private CDRef: ChangeDetectorRef,
    private translate: TranslateService,
  ) {}

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public onClickDeleteColumn(event: MouseEvent) {
    event.stopPropagation();
    const message = {
      title: this.translate.instant('modal.delete.column.title'),
      description: this.translate.instant('modal.delete.column.description'),
    };
    this.subscription.add(
      this.openDialog(message).subscribe((result) => {
        if (result) {
          this.columnsService.delete(this.column.id, this.boardId);
        }
      }),
    );
  }

  public onClickCreateTask(): void {
    const modalConfig: TTaskConfirmationModal = {
      title: '',
      description: '',
      userId: this.userStateService.user!.id,
      confirmationTitleText: this.translate.instant(
        'modal.confirmationTitleText.createTask',
      ),
      confirmationButtonText: this.translate.instant('modal.buttons.create'),
    };
    this.subscription.add(
      this.openModalWindow(modalConfig).subscribe((newTask) => {
        if (newTask) {
          this.tasksService.create(this.boardId, this.column.id, newTask);
        }
      }),
    );
  }

  public drop(event: CdkDragDrop<IColumnFull>) {
    const { container, previousContainer, currentIndex, previousIndex, item } =
      event;
    const currentOrder = currentIndex + 1;
    if (container === previousContainer) {
      moveItemInArray(container.data.tasks, previousIndex, currentIndex);
      this.moveTask({
        container,
        currentIndex,
        currentOrder,
      });
    } else {
      transferArrayItem(
        previousContainer.data.tasks,
        container.data.tasks,
        previousIndex,
        currentIndex,
      );
      this.transferTask({
        container,
        previousContainer,
        currentOrder,
        item,
      });
    }
  }

  private moveTask({
    container,
    currentIndex,
    currentOrder,
  }: IMoveTaskData): void {
    this.subscription.add(
      this.columnsService.updateTasks(
        this.boardId,
        container.data,
        this.column.tasks[currentIndex],
        currentOrder,
      ),
    );
  }

  private transferTask({
    container,
    previousContainer,
    currentOrder,
    item,
  }: ITransferTaskData): void {
    const { id: itemId, description, title, userId } = item.data;
    const newTask = {
      title,
      description,
      userId,
    };

    this.subscription.add(
      this.tasksService
        .send(this.boardId, container.data.id, newTask)
        .subscribe((task) => {
          this.tasksService.delete(
            this.boardId,
            previousContainer.data.id,
            itemId,
          );
          this.subscription.add(
            this.columnsService.updateTasks(
              this.boardId,
              container.data,
              task,
              currentOrder,
              itemId,
            ),
          );
        }),
    );
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

  public onClickTask($event: MouseEvent, task: ITask): void {
    const { title, description, userId, order, id } = task;
    const modalConfig: TTaskConfirmationModal = {
      title,
      description,
      userId,
      confirmationTitleText: this.translate.instant(
        'modal.confirmationTitleText.updateTask',
      ),
      confirmationButtonText: this.translate.instant('modal.buttons.update'),
    };
    this.openModalWindow(modalConfig).subscribe((newTask) => {
      if (newTask) {
        const updatedTask: ITask = {
          ...newTask,
          id,
          order,
        };
        this.tasksService.update(
          this.boardId,
          this.column.id,
          updatedTask,
          order,
          this.CDRef,
        );
      }
    });
  }
}
