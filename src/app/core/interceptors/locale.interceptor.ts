import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LocaleInterceptor implements HttpInterceptor {
  
  constructor(
    @Inject(LOCALE_ID) private localeId: string,
  ) {}
  
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.localeId) {
      request = request.clone({
        setHeaders: {
          'Accept-Language': this.localeId,
        }
      });
    }
    
    return next.handle(request);
  }
}
