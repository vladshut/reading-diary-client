import {Transform} from "class-transformer";
import {momentTransform} from "@app/shared/helpers/functions.helper";
import {Moment} from 'moment';

export class Feed {
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
}
