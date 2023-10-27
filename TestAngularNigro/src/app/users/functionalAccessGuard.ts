import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from "@angular/router";
import { UserService } from "./services/user-service";
import { inject } from "@angular/core";

export const canAccess:CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
    const userService: UserService = inject(UserService);
    if(userService.authenticateUser(route.params['id'])) {
        return true;
    } else return false;
}
