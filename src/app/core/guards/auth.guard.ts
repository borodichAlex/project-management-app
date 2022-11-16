import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { RoutePaths } from 'src/app/shared/constants';
import { ICanActivateReturnValue } from '../interfaces/common-guard.interface';
import { UserAuthenticationService } from '../services/user-auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private userAuthService: UserAuthenticationService,
    private router: Router,
  ) {}

  canActivate(): ICanActivateReturnValue {
    if (this.userAuthService.isAuth) return true;
    return this.router.createUrlTree([RoutePaths.welcome]);
  }
}
