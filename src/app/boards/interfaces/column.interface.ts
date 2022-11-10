import { ITask } from './task.interface';

export interface IColumnFull {
  id: string;
  title: string;
  order: number;
  tasks: ITask[];
}

export type TColumn = Pick<IColumnFull, 'id' | 'title' | 'order'>;
