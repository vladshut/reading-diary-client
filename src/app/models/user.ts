import {Transform} from "class-transformer";
import {momentTransform} from "@app/shared/helpers/functions.helper";
import {Moment} from 'moment';

export class User {
  id: string;
  email: string;
  name: string;
  token?: string;
  phoneNumber?: string;
  bio: string;
  avatar: string;
  google_id: string;
  has_password: boolean;
  @Transform(momentTransform)
  email_verified_at: Moment;

  isEmailVerified(): boolean {
    return !!this.email_verified_at
  }
}
