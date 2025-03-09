import { MethodType, EntityType } from "lyst-core/dist/constants";
import { IEntity } from "lyst-core/dist/interfaces";
import { FilterQuery } from 'mongodb';

export interface IValidationService {
  validate(entityType: EntityType, 
    methodType: MethodType, 
    body: IEntity[] | FilterQuery<IEntity>
  ) : Promise<void>;
}