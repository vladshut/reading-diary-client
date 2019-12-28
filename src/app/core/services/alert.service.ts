import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { isObject } from 'util';
import { I18n } from '@ngx-translate/i18n-polyfill';

@Injectable()
export class AlertService {
  private subject = new Subject<any>();
  private keepAfterNavigationChange = false;
  
  constructor(
    private router: Router,
    private i18n: I18n,
  ) {
    // clear alert message on route change
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.keepAfterNavigationChange) {
          // only keep for a single location change
          this.keepAfterNavigationChange = false;
        } else {
          // clear alert
          this.subject.next();
        }
      }
    });
  }
  
  info(message: string, title?: string, keepAfterNavigationChange = true) {
    this.message(message, 'info', title, keepAfterNavigationChange);
  }
  
  success(message?: string, title?: string, keepAfterNavigationChange = true) {
    this.message(message, 'success', title, keepAfterNavigationChange);
  }
  
  created(message?: string, title?: string, keepAfterNavigationChange = true) {
    message = message || this.i18n({value: 'Successfully created!', description: 'alert'});
    this.message(message, 'success', title, keepAfterNavigationChange);
  }
  
  updated(message?: string, title?: string, keepAfterNavigationChange = true) {
    message = message || this.i18n({value: 'Successfully updated!', description: 'alert'});
    this.message(message, 'success', title, keepAfterNavigationChange);
  }
  
  deleted(message?: string, title?: string, keepAfterNavigationChange = true) {
    message = message || this.i18n({value: 'Successfully removed!', description: 'alert'});
    this.message(message, 'success', title, keepAfterNavigationChange);
  }
  
  added(message?: string, title?: string, keepAfterNavigationChange = true) {
    message = message || this.i18n({value: 'Successfully added!', description: 'alert (e.g. topic to meeting)'});
    this.message(message, 'success', title, keepAfterNavigationChange);
  }
  
  uploaded(message?: string, title?: string, keepAfterNavigationChange = true) {
    message = message || this.i18n({value: 'Successfully uploaded!', description: 'alert (file)'});
    this.message(message, 'success', title, keepAfterNavigationChange);
  }
  
  imported(message?: string, title?: string, keepAfterNavigationChange = true) {
    message = message || this.i18n({value: 'Successfully created!', description: 'file'});
    this.message(message, 'success', title, keepAfterNavigationChange);
  }
  
  error(message: string, title?: string, keepAfterNavigationChange = true) {
    this.message(message, 'error', title, keepAfterNavigationChange);
  }
  
  formError(message?: string, title?: string, keepAfterNavigationChange = true) {
    message = message || this.i18n({value: 'Form has errors!', description: 'alert'});
    this.message(message, 'error', title, keepAfterNavigationChange);
  }
  
  serverError(message?: string, title?: string, keepAfterNavigationChange = true) {
    message = message || this.i18n({value: 'Server error!', description: 'alert'});
    this.message(message, 'error', title, keepAfterNavigationChange);
  }
  
  message(text: string, type: string, title?: string, keepAfterNavigationChange = true) {
    this.keepAfterNavigationChange = keepAfterNavigationChange;
    this.subject.next({text, type, title});
  }
  
  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }
  
  errors(errors: object | Array<string>): void {
    if (isObject(errors)) {
      Object.entries(errors).forEach(
        ([key, keyErrors]) => {
          this.keepAfterNavigationChange = true;
          for (const error of keyErrors) {
            this.subject.next({type: 'error', text: error});
          }
        }
      );
    }
  }
}
