import { IValidationService } from 'lyst-core-services/dist/interfaces';
import { EntityType, MethodType } from 'lyst-core/dist/constants';
import { ValidationContraints } from './validation-entities';
import { IEntity } from 'lyst-core/dist/interfaces';
import { validationMetadataKey } from './constants';
import { validate } from 'validate.js';

import './validation-entities/entity-loader';
import './custom-validators';

let isConnected = false;
let validationEntityMap: Map<EntityType, Map<MethodType, ValidationContraints<IEntity>>>

const service = <IValidationService>{
  async validate<T extends IEntity>(entityType: EntityType, methodType: MethodType, entities: T[]) {
    let methodTypeToContraintsMap = validationEntityMap.get(entityType);
    if (methodTypeToContraintsMap) {
      let validationContraints = methodTypeToContraintsMap.get(methodType);
      if (validationContraints) {
        let errors = [];
        entities.forEach(e => {
          let error = validate(e, validationContraints, { fullMessages: false });
          if (error) {
            errors.push(error);
          }
        });

        if (errors.length > 0) {
          throw errors;
        }
      }
    }
  }
};

export async function getService(): Promise<IValidationService> {
  if(isConnected) throw { error: "Cannot have multiple instances of service." };

  validationEntityMap = Reflect.get(Reflect, validationMetadataKey);

  console.log(JSON.stringify(validationEntityMap));
  
  isConnected = true;
  return service;
}