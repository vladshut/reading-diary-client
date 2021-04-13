import { Injectable } from '@angular/core';
import { I18n } from '@ngx-translate/i18n-polyfill';

@Injectable()
export class TranslationService {
  private translations: {[key: string]: string} = {};

  constructor(
    private i18n: I18n,
  ) {
    this.translations['info.copied_to_clipboard'] =
      this.i18n({value: 'Copied to clipboard', id: 'info.copied_to_clipboard'});
    this.translations['confirmation.delete_report_item'] =
      this.i18n({value: 'Are you sure you want to delete this item?', id: 'confirmation.delete_report_item'});
    this.translations['confirmation.discard_report_item_changes'] =
      this.i18n({value: 'Are you sure you want to discard the changes?', id: 'confirmation.discard_report_item_changes'});
  }

  public get(key: string): string {
      return this.translations[key] || key;
  }
}
