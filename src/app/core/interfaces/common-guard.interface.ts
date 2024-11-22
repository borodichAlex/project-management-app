import { UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

export type ICanActivateReturnValue =
  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree;
