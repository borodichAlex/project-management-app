import { IColumnFull } from './column.interface';

/* eslint-disable */
export interface IBoard {
  id: string;
  title: string;
  description: string;
}

export type TBoard = Pick<IBoard, 'title' | 'description'>;
export type TConfirmationTitleText = {
  confirmationTitleText: 'Create new Board' | 'Update the Board';
};
export type TConfirmationButtonText = {
  confirmationButtonText: 'Create' | 'Update';
};

export type TConfirmationModal = TBoard &
  TConfirmationTitleText &
  TConfirmationButtonText;

export interface IFullBoard extends IBoard {
  columns: IColumnFull[];
}
