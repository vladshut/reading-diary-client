import { FormArray, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { isObject } from 'util';

export function addErrorsToForm(form: FormGroup, errors: any) {
  if (isObject(errors)) {
    const controlNameRegExp = new RegExp(/^(.*?)\[(\d+)\]$/);
    Object.entries(errors).forEach(
      ([controlName, controlErrors]) => {
        if (controlNameRegExp.test(controlName)) {
          const match = controlNameRegExp.exec(controlName);
          const name = match[1];
          const index = match[2];
          
          if (form.contains(name) && form.get(name) instanceof FormArray && (<FormArray>form.get(name)).controls[index]) {
            if (Array.isArray(controlErrors)) {
              const subControlName = (name.substring(0, name.length - 1));
              if ((<FormArray>form.get(name)).controls[index].contains(subControlName)) {
                (<FormArray>form.get(name)).controls[index].get(subControlName).setErrors(controlErrors);
              }
            }
          }
        } else if (form.contains(controlName)) {
          form.get(controlName).setErrors(controlErrors);
        }
      }
    );
  }
}

export function validateAllFormFields(form: FormGroup | FormArray) {
  getFormValidationErrors(form);
  
  Object.keys(form.controls).forEach(field => {
    const control = form.get(field);
    if (control instanceof FormControl) {
      control.markAsTouched({onlySelf: true});
    } else if (control instanceof FormGroup || control instanceof FormArray) {
      validateAllFormFields(control);
    }
  });
}

function getFormValidationErrors(form: FormGroup | FormArray) {
  Object.keys(form.controls).forEach(key => {
    
    const controlErrors: ValidationErrors = form.get(key).errors;
    
    if (controlErrors != null) {
      Object.keys(controlErrors).forEach(keyError => {
        console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
      });
    }
  });
}
