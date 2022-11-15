/* eslint-disable */
import { TConfirmationButtonText } from './column.interface';

export interface ITask {
  id: string;
  title: string;
  order: number;
  // done: boolean;
  description: string;
  userId: string;
  boardId: string;
  columnId: string;
}

export type TTask = Pick<ITask, 'title' | 'description' | 'userId'>;
export type TTaskWithId = Pick<
  ITask,
  'id' | 'title' | 'description' | 'userId'
>;
export type TConfirmationTaskTitleText = {
  confirmationTitleText: 'Create new Task' | 'Update the Task';
};

export type TTaskConfirmationModal = TTask &
  TConfirmationTaskTitleText &
  TConfirmationButtonText;
