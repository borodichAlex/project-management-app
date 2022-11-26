/* eslint-disable @typescript-eslint/indent */
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Subscription, switchMap } from 'rxjs';
import { ITask } from '../interfaces/task.interface';
import { IFullBoard } from '../interfaces/boards.interface';
import { ApiBoardsService } from './api-boards.service';
import { IColumnFull } from '../interfaces/column.interface';

export interface ISearchTask extends ITask {
  boardId: string;
  columnId: string;
}

@Injectable()
export class SearchTaskService {
  private tasks$: BehaviorSubject<ISearchTask[]> = new BehaviorSubject<
    ISearchTask[]
  >([]);

  constructor(private boardsApiService: ApiBoardsService) {}

  public initSearchTasksData(): Subscription {
    return this.boardsApiService
      .getAll()
      .pipe(
        switchMap((allBoards) =>
          forkJoin(
            allBoards.map(({ id }) => this.boardsApiService.getById(id)),
          ),
        ),
      )
      .subscribe((boards) => {
        this.generateSearchTasks(boards);
      });
  }

  public searchTask(value: string): ISearchTask[] {
    console.log({
      value,
    });
    return this.tasks$.value.filter(
      ({ title, description }) =>
        title.includes(value) || description.includes(value),
    );
  }

  private generateSearchTasks(boards: IFullBoard[]): void {
    const searchTasks: ISearchTask[] = [];

    boards.forEach((board: IFullBoard) => {
      const boardId = board.id;

      board.columns.forEach((column: IColumnFull) => {
        const columnId = column.id;

        if (column.tasks.length) {
          const tasks = column.tasks.map((task: ITask) => ({
            ...task,
            boardId,
            columnId,
          }));
          searchTasks.push(...tasks);
        }
      });
    });

    this.tasks$.next(searchTasks);
  }
}
