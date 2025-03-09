import { IValidationService } from "../interfaces";
import { ServiceWrapper } from "./service-wrapper";
import { resolveMethod } from "./utils";
import { ServiceNames } from "../constants";
import { IEntity } from "lyst-core/dist/interfaces";
import { EntityType, MethodType } from "lyst-core/dist/constants";

export class ValidationService extends ServiceWrapper implements IValidationService {
  async validate<T extends IEntity>(entityType : EntityType, methodType: MethodType, entities: T[]) : Promise<void>{
    return resolveMethod(ServiceNames.IValidationService, this.validate.name, entityType, methodType, entities);
  }
}