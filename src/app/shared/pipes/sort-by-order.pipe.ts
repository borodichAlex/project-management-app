import { Pipe, PipeTransform } from '@angular/core';
import { IColumnFull } from '../../boards/interfaces/column.interface';

@Pipe({
  name: 'sortByOrder',
})
export class SortByOrderPipe implements PipeTransform {
  // eslint-disable-next-line class-methods-use-this
  transform(value: IColumnFull[] | null): IColumnFull[] {
    if (!value) {
      return [];
    }

    return value.sort((a, b) => a.order - b.order);
  }
}
