import { Injectable } from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import { AuthService } from '@app/core/services/auth.service';

@Injectable()
export class UnAuthGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (!this.authService.isAuthenticated()) {
            return true;
        }

        const redirect = route.queryParams['redirectUrl'] || '/books/list';
        this.router.navigate([redirect]);

        return false;
    }
}
