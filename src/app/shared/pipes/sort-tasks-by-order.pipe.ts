import { Pipe, PipeTransform } from '@angular/core';
import { ITask } from 'src/app/boards/interfaces/task.interface';

@Pipe({
  name: 'sortTasksByOrder',
})
export class SortTasksByOrderPipe implements PipeTransform {
  // eslint-disable-next-line class-methods-use-this
  transform(value: ITask[] | null): ITask[] {
    if (!value) {
      return [];
    }
    return value.sort((a, b) => a.order - b.order);
  }
}
