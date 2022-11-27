import { Injectable } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { LangCode, LangStorageKey } from '../../interfaces/translate.interface';

@Injectable({
  providedIn: 'root',
})
export class AppLanguageService {
  public get currentLang(): LangCode {
    return this.translate.currentLang as LangCode;
  }

  private defaultLanguage: LangCode = 'en';

  private storageKey: LangStorageKey = 'lang';

  constructor(private translate: TranslateService) {}

  public change(localeCode: LangCode): void {
    this.translate.use(localeCode);
  }

  public init(lang?: LangCode): void {
    this.translate.use(
      window.localStorage.getItem(this.storageKey) ||
        lang ||
        this.defaultLanguage,
    );
  }

  public initSaveOnLangChangeObserver(): Subscription {
    return this.translate.onLangChange.subscribe(
      ({ lang }: LangChangeEvent) => {
        this.saveCurrentLanguage(lang as LangCode);
      },
    );
  }

  private saveCurrentLanguage(localeCode: LangCode): void {
    window.localStorage.setItem(this.storageKey, localeCode);
  }
}
