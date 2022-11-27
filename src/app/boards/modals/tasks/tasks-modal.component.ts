import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgIf } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { TTaskConfirmationModal } from '../../interfaces/task.interface';

@Component({
  standalone: true,
  selector: 'app-tasks-modal',
  templateUrl: './tasks-modal.component.html',
  styleUrls: ['./tasks-modal.component.scss'],
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgIf,
    MatButtonModule,
    TranslateModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TasksModalComponent {
  public form = this.fb.group({
    title: [this.data.title, Validators.required],
    description: [this.data.description, Validators.required],
    userId: this.data.userId,
  });

  public maxLength = {
    title: 50,
    description: 150,
  };

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: TTaskConfirmationModal,
  ) {}
}
