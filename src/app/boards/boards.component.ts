import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoggingService } from '../core/services/logging.service';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardsComponent {
  constructor(private loggingService: LoggingService) {}

  public logout() {
    this.loggingService.logOut();
  }
}
