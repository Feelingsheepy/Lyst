import { IEntity} from "lyst-core/dist/interfaces";
import { MethodType, EntityType } from "lyst-core/dist/constants";

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
  empty(value, options, key, attributes) : string;
}

export type ValidationConstraint = AvailableDefaultValidators & AvailableCustomValidators

export type ValidationContraints<T> = {
  [P in keyof T]: ValidationConstraint 
}

export interface IValidationEntity<T extends IEntity> {
  entityType: EntityType;
  methodType: MethodType;
  constraints: ValidationContraints<T>;
}