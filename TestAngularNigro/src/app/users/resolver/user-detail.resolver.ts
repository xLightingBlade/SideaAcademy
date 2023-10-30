import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterStateSnapshot,
} from '@angular/router';
import { UserDto } from '../interfaces/user-interfaces';
import { UserService } from '../services/user-service';
import { inject } from '@angular/core';

/**
 * This resolver pre-fetches user data before rendering the user detail page
 * @param route A snapshot of current ActivatedRoute
 * @returns A user data if user exists and has that ID value, undefined otherwise
 */
export const userDetailResolver: ResolveFn<UserDto | undefined> = (route) =>
  inject(UserService).getUserById(Number(route.paramMap.get('id')));
