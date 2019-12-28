import { I18n } from '@ngx-translate/i18n-polyfill';

export interface MediaItemInterface {
  image?: string;
  avatar?: string;
  title?: string;
  titleSmall?: string;
  subTitle?: string;
  icon?: string;
  avatarBgColor?: string;
}

export interface ToMediaItem {
  toMediaItem(i18n: I18n): MediaItemInterface;
}
