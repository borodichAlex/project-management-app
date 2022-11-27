import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IData } from '../../services/types';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: IData) {}
}
