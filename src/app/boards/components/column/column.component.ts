import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TColumn } from '../../interfaces/column.interface';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColumnComponent {
  @Input() column!: TColumn;
}
