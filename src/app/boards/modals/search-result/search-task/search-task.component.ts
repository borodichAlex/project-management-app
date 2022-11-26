import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ISearchTask } from 'src/app/boards/services/search-task.service';

@Component({
  selector: 'app-search-task',
  templateUrl: './search-task.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchTaskComponent {
  @Input() task!: ISearchTask;
}
