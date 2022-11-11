import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export type ConfirmationDialogPasswordData = {
  password: string;
  confirmationTitleText: string;
  confirmationButtonText: string;
};

@Component({
  selector: 'app-confirmation-dialog-password',
  templateUrl: './confirmation-dialog-password.component.html',
  styleUrls: ['./confirmation-dialog-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationDialogPasswordComponent {
  public passwordControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(32),
  ]);

  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogPasswordData,
  ) {}
}
