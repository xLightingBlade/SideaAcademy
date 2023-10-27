import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { PlaceService } from './places/services/places-service';

@Injectable({
  providedIn: 'root'
})
export class CanEnterPlaceGuard implements CanActivate {
  constructor(private _placeService:PlaceService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this._placeService.authenticatePlace(route.params['id']);
  }
  
}
