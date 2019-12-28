import {Injectable} from '@angular/core';
import {I18n} from '@ngx-translate/i18n-polyfill';
import {BytesPipe} from 'angular-pipes';

@Injectable()
export class ValidationService {
  static PATTERN_POSTCODE = new RegExp('^[1-9]{1}[0-9]{3}[\\s]{0,1}[a-z]{2}$', 'i');
  static PATTERN_URL = new RegExp('^[-a-zA-Z0-9@:%_\\+.~#?&//=]{2,256}\\.[a-z]{2,4}\\b(\\/[-a-zA-Z0-9@:%_\\+.~#?&//=]*)?$', 'i');
  static PATTERN_KVK_NUMBER = new RegExp('^[0-9]*$');

  constructor(
    private i18n: I18n,
    private fileSizePipe: BytesPipe,
  ) {
  }

  public getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
    const config = {
      'required': this.i18n({value: 'Required', id: 'validation.required'}),
      'minlength': this.i18n('Minimum length {{length}}', {length: validatorValue.requiredLength}),
      'email': this.i18n('Invalid email address'),
      'onlyOneOfFieldsRequired': this.i18n('One of {{fields}} must be provided', {fields: validatorValue.fieldsNames ? validatorValue.fieldsNames.join(', ') : ''}),
      'iban': this.i18n('This is not a valid International Bank Account Number (IBAN)'),
      'validatePhoneNumber': this.i18n('Invalid phone number'),
      'max-file-size': this.i18n({
        value: 'Maximum file size is {{maxFileSize}}',
        id: 'validation.file_size'
      }, {maxFileSize: this.fileSizePipe.transform(validatorValue.maxFileSize)}),
      'max': this.i18n({value: 'Max value is {{maxValue}}', id: 'validation.max'}, {maxValue: validatorValue.max}),
      'min': this.i18n({value: 'Min value is {{minValue}}', id: 'validation.min'}, {minValue: validatorValue.min}),
      'isbn': this.i18n({value: 'Value is not a valid ISBN{{type}}', id: 'validation.isbn'}, {type: validatorValue.type}),
    };

    let message = config[validatorName] || '';

    if (validatorName === 'pattern') {
      if (validatorValue.requiredPattern.toString() === ValidationService.PATTERN_POSTCODE.toString()) {
        message = this.i18n('Value is not a valid postcode');
      }

      if (validatorValue.requiredPattern.toString() === ValidationService.PATTERN_KVK_NUMBER.toString()) {
        message = this.i18n({value: 'Value is not a valid KvK number', id: 'validation.kvk_number'});
      }

      if (validatorValue.requiredPattern.toString() === ValidationService.PATTERN_URL.toString()) {
        message = this.i18n({value: 'Value is not a valid URL', id: 'validation.url'});
      }
    }

    return message;
  }
}
