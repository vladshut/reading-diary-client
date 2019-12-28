import {User} from "@app/models/user";
import {Book} from "@app/models/book";
import { Moment } from 'moment';
import {Transform, Type} from "class-transformer";
import {momentTransform} from "@app/shared/helpers/functions.helper";

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

  isReading(): boolean {
    return this.status === 'reading';
  }

  isRead(): boolean {
    return this.status === 'read';
  }

  isNotRead(): boolean {
    return this.status === 'not_read';
  }

  isReadingCanceled(): boolean {
    return this.status === 'canceled';
  }
}
