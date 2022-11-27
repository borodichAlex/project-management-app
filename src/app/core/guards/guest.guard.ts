import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { RoutePaths } from 'src/app/shared/constants';
import { ICanActivateReturnValue } from '../interfaces/common-guard.interface';
import { UserAuthenticationService } from '../services/user-auth.service';

@Injectable()
export class GuestGuard implements CanActivate {
  constructor(
    private userAuthService: UserAuthenticationService,
    private router: Router,
  ) {}

  canActivate(): ICanActivateReturnValue {
    const isGuest = !this.userAuthService.isAuth;
    if (isGuest) return true;
    return this.router.createUrlTree([RoutePaths.boards]);
  }
}
