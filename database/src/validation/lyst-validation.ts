import { ILyst } from "lyst-core/dist/interfaces";
import { IValidationEntity, ValidationContraints } from './validation-entity';
import { injectable } from 'inversify';
import { fluentProvide } from 'inversify-binding-decorators';
import { TYPES } from "../constants";
import { EntityType, MethodType } from "lyst-core/dist/constants";

@injectable()
export abstract class LystValidation implements IValidationEntity<ILyst> {
  abstract methodType : MethodType;

  constraints: ValidationContraints<ILyst>;

  entityType = EntityType.lyst;

  constructor() {
    this.constraints = {
      _id: {
        presence: {
          allowEmpty: false
        },
        format: {
          pattern: /^[a-f\d]{24}$/i
        }
      },
      name: {
        presence: true,
        length: {
          minimum: 4,
          maximum: 20
        },
        format: {
          pattern: /(\S(.*\S)?)?/
        }
      },
      description: {
        format: {
          pattern: /(\S(.*\S)?)?/
        }
      }
    }
  }
}

@fluentProvide(TYPES.IValidationEntity).inSingletonScope().done() 
export class PostLystValidation extends LystValidation {
  methodType = MethodType.post;

  constructor() {
    super();
    this.constraints._id = {
      empty: true
    }
  }
}

@fluentProvide(TYPES.IValidationEntity).inSingletonScope().done()
export class PatchLystValidation extends LystValidation {
  methodType = MethodType.patch;

  constructor() {
    super();
    this.constraints.name.presence = false;
  }
}

@fluentProvide(TYPES.IValidationEntity).inSingletonScope().done()
export class PutLystValidation extends LystValidation {
  methodType = MethodType.put;

  constructor() {
    super();
  }
}