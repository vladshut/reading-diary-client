import { FormGroup } from '@angular/forms';
import { not } from 'rxjs/internal-compatibility';

export const OnlyOneOfFieldsRequiredValidator = (fieldsNames: string[], required: boolean) => {
  return (group: FormGroup) => {
    const emptyValues = [null, undefined, '', []];
    const notEmptyFields = fieldsNames.filter((fieldName) => {
      const value = group.get(fieldName).value;
      return emptyValues.indexOf(value) === -1;
    });
    
    const touchedFieldName = fieldsNames.find((fieldName) => {
      return group.get(fieldName).touched;
    });
    
    if (touchedFieldName && ((required && notEmptyFields.length !== 1) || (!required &&  notEmptyFields.length > 1))) {
      return {
        onlyOneOfFieldsRequired: {fieldsNames}
      };
    }
    
    return null;
  };
};
