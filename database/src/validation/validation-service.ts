import { multiInject } from 'inversify';
import { fluentProvide } from 'inversify-binding-decorators';
import { TYPES } from '../constants';
import { IValidationService } from '../interfaces';
import { EntityType, MethodType } from 'lyst-core/dist/constants';
import { IValidationEntity, CustomValidators } from '.';
import { IEntity } from 'lyst-core/dist/interfaces';
import { validate, validators, isDefined } from 'validate.js';

const customValidators = <CustomValidators>{
  empty: (value, options, key, attributes) => {
    if (isDefined(value)) {
      return "must be empty";
    }

    return null;
  }
}

@fluentProvide(TYPES.IValidationService).inSingletonScope().done()
export class ValidationService implements IValidationService {
  private readonly _validationEntities = new Map<EntityType, Map<MethodType, IValidationEntity<IEntity>>>();

  constructor(
    @multiInject(TYPES.IValidationEntity) validationEntities: IValidationEntity<IEntity>[]
  ) {
    validationEntities.forEach((v) => {
      let methodTypeToEntityMap = this._validationEntities.get(v.entityType);
      if (!methodTypeToEntityMap) {
        methodTypeToEntityMap = new Map<MethodType, IValidationEntity<IEntity>>();
        this._validationEntities.set(v.entityType, methodTypeToEntityMap);
      }

      methodTypeToEntityMap.set(v.methodType, v);
    });

    this.initializeCustomValidators();
  }

  async validate(entityType: EntityType, methodType: MethodType, body) {
    let methodTypeToEntityMap = this._validationEntities.get(entityType);
    if(methodTypeToEntityMap) {
      let validationEntity = methodTypeToEntityMap.get(methodType);
      if(validationEntity) {
        let errors = [];
        (<[]>body).forEach(e => {
          let error = validate(e, validationEntity.constraints, { fullMessages: false });
          if (error) {
            errors.push(error);
          }
        });

        if(errors.length > 0) {
          throw errors;
        }
      }
    }
  }

  private initializeCustomValidators() {
    let validatorNames = Object.getOwnPropertyNames(customValidators);
    validatorNames.forEach((n) => validators[n] = customValidators[n]);
  }
}