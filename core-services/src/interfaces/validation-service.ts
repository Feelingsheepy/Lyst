import { EntityType, MethodType } from "lyst-core/dist/constants";
import { IEntity } from "lyst-core/dist/interfaces";

export interface IValidationService {
  validate<T extends IEntity>(entityType: EntityType, methodType: MethodType, entities: T[]) : Promise<void>;
}