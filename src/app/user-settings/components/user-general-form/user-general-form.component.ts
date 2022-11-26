import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, switchMap } from 'rxjs';

import { UserData } from 'src/app/core/interfaces/user.interface';
import {
  TranslateUserGeneralData,
  UserGeneralField,
  UserGeneralFieldsKeys,
} from './user-general-form.interface';

@Component({
  selector: 'app-user-general-form',
  templateUrl: './user-general-form.component.html',
  styleUrls: ['./user-general-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserGeneralFormComponent implements OnInit, OnDestroy {
  @Input() userName!: string;

  @Input() userLogin!: string;

  @Output() changeUserField: EventEmitter<Partial<UserData>> =
    new EventEmitter();

  public userGeneralForm!: FormGroup;

  public readonly translateBasePath = 'userSettingsPage.userGeneralSection';

  public translateData!: TranslateUserGeneralData;

  public userGeneralFields: UserGeneralField[] = [
    {
      name: 'name',
      translateKey: 'userName',
    },
    {
      name: 'login',
      translateKey: 'userLogin',
    },
  ];

  private subscription!: Subscription;

  constructor(private translateService: TranslateService) {}

  public ngOnInit(): void {
    this.initUserGeneralForm();
    this.initTranslateDataObserver();
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  public initUserGeneralForm(): void {
    this.userGeneralForm = new FormGroup<{
      [key in keyof Omit<UserData, 'id'>]: FormControl<string | null>;
    }>({
      name: new FormControl(this.userName, [Validators.required]),
      login: new FormControl(this.userLogin, [Validators.required]),
    });
  }

  public onChangeField(controlName: UserGeneralFieldsKeys): void {
    const valueField = this.userGeneralForm.value[controlName];
    if (valueField) {
      const partialUser: Partial<UserData> = {
        [controlName]: valueField,
      };

      this.changeUserField.emit(partialUser);
    }
  }

  private initTranslateDataObserver(): void {
    this.translateService
      .get(this.translateBasePath)
      .subscribe((res: TranslateUserGeneralData) => {
        this.translateData = res;
      });
    this.translateService.onLangChange
      .pipe(switchMap(() => this.translateService.get(this.translateBasePath)))
      .subscribe((res: TranslateUserGeneralData) => {
        this.translateData = res;
      });
  }
}
