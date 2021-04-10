import {Transform} from "class-transformer";
import {apiUrl, momentTransform} from "@app/shared/helpers/functions.helper";
import {Moment} from 'moment';
import {env} from "@env/env";

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
  @Transform(momentTransform)
  created_at: Moment;
  read_books_count?: number;
  followers_count?: number;
  followees_count?: number;

  isEmailVerified(): boolean {
    return !!this.email_verified_at
  }

  get readBooksCount(): number {
    return this.read_books_count ? this.read_books_count : 0;
  }

  get avatarLink(): string {
    return apiUrl(this.avatar);
  }
}
