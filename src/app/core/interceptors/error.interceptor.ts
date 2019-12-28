import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '@app/core/services/auth.service';
import {Router} from "@angular/router";

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService, private router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            console.error(err);
            if (err.status === 401 && this.authService.getToken()) {
                console.log(err);
                // auto logout if 401 response returned from api
                this.authService.logout();
                this.router.navigate(['/login']);
            }

            let errors = {};

            if (err.error.hasOwnProperty('errors')) {
                errors = err.error.errors || err.statusText;
            }

            return throwError(errors);
        }));
    }
}
