import { CustomValidators } from './validation-entities';
import { isDefined, validators } from 'validate.js';

const customValidators = <CustomValidators>{
  empty: (value, options, key, attributes) => {
    if (isDefined(value)) {
      return "must be empty";
    }

    return null;
  }
}


let validatorNames = Object.getOwnPropertyNames(customValidators);
validatorNames.forEach((n) => validators[n] = customValidators[n]);