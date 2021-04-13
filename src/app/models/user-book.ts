import {User} from "@app/models/user";
import {Book} from "@app/models/book";
import { Moment } from 'moment';
import {Transform, Type} from "class-transformer";
import {momentTransform} from "@app/shared/helpers/functions.helper";
import {Dictionary} from "@app/models/dictionary";
import {I18n} from "@ngx-translate/i18n-polyfill";
import {TranslationService} from "@app/core/services/translation.service";

export enum UserBookType {
  Reading = 'reading',
  Read = 'read',
  NotRead = 'not_read',
  Canceled = 'canceled',
}

export class UserBook {
  id: string;
  @Type(() => User)
  user: User;
  @Type(() => Book)
  book: Book;
  status: string;
  @Transform(momentTransform)
  created_at: Moment;
  @Transform(momentTransform)
  start_reading_dt: Moment;
  @Transform(momentTransform)
  end_reading_dt: Moment;
  report_public_key: string;
  is_report_published: boolean;

  isReading(): boolean {
    return this.status === UserBookType.Reading;
  }

  isRead(): boolean {
    return this.status === UserBookType.Read;
  }

  isNotRead(): boolean {
    return this.status === UserBookType.NotRead;
  }

  isReadingCanceled(): boolean {
    return this.status === UserBookType.Canceled;
  }

  isPublic(): boolean {
    return !!this.report_public_key;
  }

  static getStatusesAsOptions(trans: TranslationService): Dictionary[] {
    return [
      new Dictionary(UserBookType.Reading, trans.get('dict.user_book_type.reading')),
      new Dictionary(UserBookType.Read, trans.get('dict.user_book_type.read')),
      new Dictionary(UserBookType.NotRead, trans.get('dict.user_book_type.not_read')),
      new Dictionary(UserBookType.Canceled, trans.get('dict.user_book_type.canceled')),
    ];
  }
}
