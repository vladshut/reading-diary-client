import { Injectable } from '@angular/core';
import { I18n } from '@ngx-translate/i18n-polyfill';
import {UserBookType} from "@app/models/user-book";

@Injectable()
export class TranslationService {
  private readonly translations: {[key: string]: string} = {};

  constructor(i18n: I18n) {
    this.translations = {
      'info.copied_to_clipboard': i18n({value: 'Copied to clipboard', id: 'info.copied_to_clipboard'}),
      'confirmation.delete_report_item': i18n({value: 'Are you sure you want to delete this item?', id: 'confirmation.delete_report_item'}),
      'confirmation.discard_report_item_changes': i18n({value: 'Are you sure you want to discard the changes?', id: 'confirmation.discard_report_item_changes'}),
      'dict.user_book_type.reading': i18n({id: 'dict.user_book_type.reading', value: 'Reading'}),
      'dict.user_book_type.read': i18n({id: 'dict.user_book_type.read', value: 'Read'}),
      'dict.user_book_type.not_read': i18n({id: 'dict.user_book_type.not_read', value: 'Not read'}),
      'dict.user_book_type.canceled': i18n({id: 'dict.user_book_type.canceled', value: 'Canceled'}),
    };
  }

  public get(key: string): string {
      return this.translations[key] || key;
  }
}
