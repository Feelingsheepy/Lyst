import { ILyst } from "lyst-core/dist/interfaces";
import { IValidationEntity, ValidationContraints, validationEntity } from './validation-entity';
import { EntityType, MethodType } from "lyst-core/dist/constants";

export abstract class LystValidation implements IValidationEntity<ILyst> {
  constraints: ValidationContraints<ILyst>;

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

@validationEntity(EntityType.lyst, MethodType.create)
export class CreateLystValidation extends LystValidation {
  constructor() {
    super();
    this.constraints._id = {
      empty: true
    }
  }
}

@validationEntity(EntityType.lyst, MethodType.update)
export class UpdateLystValidation extends LystValidation {
  constructor() {
    super();
    this.constraints.name.presence = false;
  }
}

@validationEntity(EntityType.lyst, MethodType.replace)
export class ReplaceLystValidation extends LystValidation {
  constructor() {
    super();
  }
}