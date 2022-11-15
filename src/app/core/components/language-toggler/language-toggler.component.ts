import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LangCode } from 'src/app/shared/interfaces/translate.interface';
import { AppLanguageService } from '../../../shared/services/translate/app-language.service';

@Component({
  selector: 'app-language-toggler',
  templateUrl: './language-toggler.component.html',
  styleUrls: ['./language-toggler.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageTogglerComponent implements OnInit {
  public langControl = new FormControl('');

  constructor(private appLangService: AppLanguageService) {}

  ngOnInit(): void {
    this.langControl.setValue(this.appLangService.currentLang);
  }

  onChange(): void {
    this.appLangService.change(this.langControl.value as LangCode);
  }
}
