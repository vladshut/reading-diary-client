import { AbstractControl } from '@angular/forms';
import { checkMaximumFileSize } from '@app/shared/helpers/functions.helper';
import { isArray } from 'angular-pipes/utils/utils';
import { UploadedFile } from '@app/models/uploaded-file';

export const MaxFileSizeValidator = (maxFileSize: number) => {
  return (c: AbstractControl) => {
    const files = <FileList | File[]>(c.value ? c.value.files : []);
    
    if (files && !checkMaximumFileSize(files, maxFileSize)) {
      return {'max-file-size': {value: files, maxFileSize}};
    }
    
    return null;
  };
};
