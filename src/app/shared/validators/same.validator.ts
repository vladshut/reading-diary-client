import { FormGroup } from '@angular/forms';

export const SameValidator = (fields: {[key: string]: string}) => {
  return (group: FormGroup) => {
    const fieldsKeys = Object.keys(fields);
    const fieldsNames = Object.values(fields);
    const fieldValues = fieldsKeys.map(k => group.get(k).value);

    const allEqual = fieldValues.every(v => v === group.get(fieldsKeys[0]).value);

    console.log('allEqual: ', allEqual, fieldsKeys, fieldsNames, fields);

    if (!allEqual) {
      return {same: {fieldsNames}};
    }

    return null;
  };
};
