import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

// import { ROUTEPATHS } from './shared/constants';
import { AppLanguageService } from './shared/services/translate/app-language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  private langChangeSubscription!: Subscription;

  private loggingSubscription!: Subscription;

  constructor(
    private appLangService: AppLanguageService,
    private router: Router,
  ) {}

  public ngOnInit(): void {
    this.initAppLanguage();
    // this.redirectOnLogStatus();
  }

  public ngOnDestroy(): void {
    this.langChangeSubscription.unsubscribe();
    // this.loggingSubscription.unsubscribe();
  }

  private initAppLanguage(): void {
    this.appLangService.init('en');
    this.langChangeSubscription =
      this.appLangService.initSaveOnLangChangeObserver();
  }

  // private redirectOnLogStatus(): void {
  //   this.loggingSubscription = this.loggingService.isLoggedIn$.subscribe(
  //     (isLogged) => {
  //       if (isLogged) {
  //         this.router.navigate([ROUTEPATHS.boards]);
  //       } else {
  //         this.router.navigate([ROUTEPATHS.welcome]);
  //       }
  //     },
  //   );
  // }
}
