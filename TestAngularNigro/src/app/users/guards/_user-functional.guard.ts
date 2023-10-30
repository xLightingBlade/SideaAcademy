import { ActivatedRouteSnapshot, CanActivateFn } from '@angular/router';

export const canAccess: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  //const userService: UserService = inject(UserService);
  if (authenticateUser(route.params['id'])) {
    return true;
  } else return false;
};

export const authenticateUser = (id: number) => {
  if (id % 2 == 0) {
    console.log('Access denied, even id');
    return false;
  } else {
    console.log('Access permitted, odd id');
    return true;
  }
};

export const idIsNan: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const id = Number(route.params['id']);
  if (isNaN(id)) {
    return false;
  } else return true;
};
