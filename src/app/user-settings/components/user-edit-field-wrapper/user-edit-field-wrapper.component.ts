import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-user-edit-field-wrapper',
  templateUrl: './user-edit-field-wrapper.component.html',
  styleUrls: ['./user-edit-field-wrapper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserEditFieldWrapperComponent {
  @Input() buttonText!: string;

  @Input() labelText!: string;

  @Output() editFieldClick: EventEmitter<string> = new EventEmitter();

  public onClick(): void {
    this.editFieldClick.emit();
  }
}
