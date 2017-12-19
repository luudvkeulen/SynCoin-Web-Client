import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { getTypeNameForDebugging } from '@angular/core/src/change_detection/differs/iterable_differs';
import { AccountService } from './account.service';

@Injectable()
export class LoginGuard implements CanActivate {

  constructor(
    private router: Router,
    private accountService: AccountService
  ) {
    
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.accountService.isUserLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
