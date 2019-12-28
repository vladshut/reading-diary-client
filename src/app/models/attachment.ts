import { Transform, Type } from 'class-transformer';
import { Moment } from 'moment';
import { momentTransform } from '@app/shared/helpers/functions.helper';

export const MaxFileSize = 1048576 * 5;

export class Attachment {
  id?: string;
  @Transform(momentTransform)
  createdAt: Moment;
  fileName: string;
  link: string;
  extension: string;
  @Transform(function (value, obj, type): any {
    return (typeof value === 'string') ? parseInt(value, 10) : value;
  })
  size: number;
  isTemp: boolean;
  filePath: string;

  fileId?: string;

  get nameWithoutExt() {
    if (!this.extension) {
      return this.fileName;
    }

    const lastIndex = this.fileName.lastIndexOf('.' + this.extension);

    return this.fileName.substring(0, lastIndex);
  }
}
