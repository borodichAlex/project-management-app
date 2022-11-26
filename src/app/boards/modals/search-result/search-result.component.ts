import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogData } from 'src/app/shared/components/confirmation/confirmation.component';
import { ISearchTask } from '../../services/search-task.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchResultComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private router: Router,
  ) {}

  // eslint-disable-next-line class-methods-use-this
  public onClickTask(task: ISearchTask): void {
    console.log({
      task,
    });
  }
}
