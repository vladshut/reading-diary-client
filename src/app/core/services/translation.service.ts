import { Injectable } from '@angular/core';
import { I18n } from '@ngx-translate/i18n-polyfill';

@Injectable()
export class TranslationService {
  constructor(
    private i18n: I18n,
  ) {}

}
