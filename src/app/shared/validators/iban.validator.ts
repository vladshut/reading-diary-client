import { AbstractControl } from '@angular/forms';
import * as IBAN from 'iban';

export const IbanValidator = () => {
  return (c: AbstractControl) => {
    return (!c.value || IBAN.isValid(c.value)) ? null : {'iban': {value: c.value}};
  };
};
