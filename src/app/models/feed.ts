import {Transform} from "class-transformer";
import {apiUrl, momentTransform, ucFirst} from "@app/shared/helpers/functions.helper";
import {Moment} from 'moment';
import * as moment from 'moment';

export class Feed {
  public static TYPE_REPORT_PUBLISHED = 'report_published';

  id: string
  author_id: string
  title: string
  @Transform(momentTransform)
  date: Moment
  body: string
  image: string
  type: string
  target_id: string
  data: object
  author_name: string
  author_image: string
  is_favorite: boolean

  public isReportPublishedType(): boolean {
    return this.type === Feed.TYPE_REPORT_PUBLISHED;
  }

  get userDate(): string {
    if (moment().diff(this.date, 'days') < 2) {
      return this.date.fromNow();
    }

    return this.date.format('LLL');
  }

  get authorImage(): string {
    return apiUrl(this.author_image);
  }

  get userType(): string {
    let type = ucFirst(this.type);
    type = type.replace("_", " ");

    return type;
  }
}
