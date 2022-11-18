/* eslint-disable */
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
