import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { UserAuthenticationService } from './core/services/user-auth.service';

import { AppLanguageService } from './shared/services/translate/app-language.service';

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
    private userAuthService: UserAuthenticationService,
  ) {
    this.userAuthService.initAuth();
  }

  public ngOnInit(): void {
    this.initAppLanguage();
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
