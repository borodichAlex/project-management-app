import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
  ) {
    this.matIconRegistry.addSvgIcon(
      'git-logo',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../../assets/icons/github-logo.svg',
      ),
    );
    this.matIconRegistry.addSvgIcon(
      'rss-logo',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../../../../assets/icons/rss.svg',
      ),
    );
  }
}
