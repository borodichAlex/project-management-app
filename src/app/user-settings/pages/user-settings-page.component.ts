import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { UserData } from 'src/app/core/interfaces/user.interface';
import { UserStateService } from 'src/app/core/services/user-state.service';

@Component({
  selector: 'app-user-settings-page',
  templateUrl: './user-settings-page.component.html',
  styleUrls: ['./user-settings-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSettingsPageComponent implements OnInit, OnDestroy {
  public user!: UserData;

  private subscription!: Subscription;

  constructor(private userStateService: UserStateService) {}

  public ngOnInit(): void {
    this.subscription = this.userStateService.user$.subscribe((userData) => {
      if (userData) {
        this.user = userData;
      }
    });
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  // eslint-disable-next-line class-methods-use-this
  public onDeleteClick(): void {
    // TODO:
    // * open confirmation dialog
    // * call user-settings-service.deleteUser()
    throw new Error('Method not implemented.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, class-methods-use-this
  public handleChangeField(partialUser: Partial<UserData>): void {
    // TODO:
    // * open edit user modal
    // * call user-settings-service.editUser()
    throw new Error('Method not implemented.');
  }
}
