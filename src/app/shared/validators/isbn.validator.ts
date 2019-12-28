import { AbstractControl } from '@angular/forms';
import * as ISBN from 'isbn-validate';

export const IsbnValidator = (type: 10|13) => {
  return (c: AbstractControl) => {
    return (!c.value || ISBN.Validate(c.value)) ? null : {'isbn': {type, value: c.value}};
  };
};

