import { IEntity } from "lyst-core/dist/interfaces";
import { MethodType, EntityType } from "lyst-core/dist/constants";
import { validationMetadataKey } from '../constants';

type PresenceType = boolean | { allowEmpty?: boolean, message?: string };
type LengthType = { is?: number, minimum?: number, maximum?: number };
type FormatType = { pattern?: RegExp };

type AvailableDefaultValidators = {
  presence?: PresenceType,
  length?: LengthType,
  format?: FormatType
}

type AvailableCustomValidators = {
  [P in keyof CustomValidators]?: boolean
}

//(value, options, key, attributes)
export type CustomValidators = {
  empty(value, options, key, attributes): string;
}

export type ValidationConstraint = AvailableDefaultValidators & AvailableCustomValidators

export type ValidationContraints<T> = {
  [P in keyof T]: ValidationConstraint
}

export interface IValidationEntity<T extends IEntity> {
  constraints: ValidationContraints<T>;
}

function construct<T>(constructor, args) : T {
  const c: any = function() {
    return constructor.apply(this, args);
  }
  
  c.prototype = constructor.prototype;
  return new c();
}

export function validationEntity(entityType: EntityType, methodType: MethodType) {
  return <T extends { new(...args: any[]): IValidationEntity<IEntity> }>(constructor: T) => {
    console.log(`New validation entity: ${entityType} - ${methodType}`);
    if (!Reflect.has(Reflect, validationMetadataKey)) {
      if(!Reflect.defineProperty(Reflect, validationMetadataKey, { value: new Map<EntityType, Map<MethodType, ValidationContraints<IEntity>>>() })) {
        console.log("Couldn't define property");
      }
    }

    let validationContraints: Map<EntityType, Map<MethodType, ValidationContraints<IEntity>>> = Reflect.get(Reflect, validationMetadataKey);
    let validationEntity = new constructor();

    if(!validationContraints.has(entityType)) {
      validationContraints.set(entityType, new Map<MethodType, ValidationContraints<IEntity>>());
    }

    let methodToEntityMap = validationContraints.get(entityType);

    if(methodToEntityMap.has(methodType)) console.log(`Duplicate method type: ${entityType} - ${methodType}`);

    methodToEntityMap.set(methodType, validationEntity.constraints);
  }
}