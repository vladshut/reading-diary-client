import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { isObject } from 'util';
import { I18n } from '@ngx-translate/i18n-polyfill';
import { AlertService } from '@app/core/services/alert.service';

@Injectable()
export class SweetAlertService extends AlertService {

}
