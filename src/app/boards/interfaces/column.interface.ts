/* eslint-disable */
import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { ITask } from './task.interface';

export interface IColumnFull {
  id: string;
  title: string;
  order: number;
  tasks: ITask[];
}

export type TColumn = Pick<IColumnFull, 'id' | 'title' | 'order'>;

export type TNewColumn = Pick<IColumnFull, 'title'>;

export type TConfirmationTitleText = {
  confirmationTitleText: 'Create new Column' | 'Update the Column';
};

export type TConfirmationButtonText = {
  confirmationButtonText: 'Create' | 'Update';
};

export type TConfirmationModal = TNewColumn &
  TConfirmationTitleText &
  TConfirmationButtonText;

export type IMoveTaskData = {
  container: CdkDropList;
  currentIndex: number;
  currentOrder: number;
};

export type ITransferTaskData = {
  container: CdkDropList;
  previousContainer: CdkDropList;
  currentOrder: number;
  item: CdkDrag<any>;
};
