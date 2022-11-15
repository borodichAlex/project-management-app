import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { UserStateService } from './core/services/user-state.service';

import { AppLanguageService } from './shared/services/translate/app-language.service';

const mockUserData = {
  id: 'id-user',
  name: 'Vasya',
  login: 'user012',
};
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  private langChangeSubscription!: Subscription;

  constructor(
    private appLangService: AppLanguageService,
    private userStateService: UserStateService,
  ) {}

  public ngOnInit(): void {
    this.initAppLanguage();
    this.userStateService.init(mockUserData);
  }

  public ngOnDestroy(): void {
    this.langChangeSubscription.unsubscribe();
  }

  private initAppLanguage(): void {
    this.appLangService.init('en');
    this.langChangeSubscription =
      this.appLangService.initSaveOnLangChangeObserver();
  }
}
