import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './users/services/user-service';

@Injectable({
  providedIn: 'root'
})
export class CanEnterUserGuard implements CanActivate {
  constructor(private _userService:UserService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this._userService.authenticateUser(route.params['id']);
  }
  
}
