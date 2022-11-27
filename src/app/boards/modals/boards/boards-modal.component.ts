import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { TConfirmationModal } from '../../interfaces/boards.interface';

@Component({
  standalone: true,
  selector: 'app-boards-modal',
  templateUrl: './boards-modal.component.html',
  styleUrls: ['./boards-modal.component.scss'],
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
    MatButtonModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardsModalComponent {
  public form = this.fb.group({
    title: [this.data.title, Validators.required],
    description: [this.data.description, Validators.required],
  });

  public maxLength = {
    title: 20,
    description: 150,
  };

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: TConfirmationModal,
  ) {}
}
