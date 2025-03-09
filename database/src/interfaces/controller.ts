import { EntityType, MethodType } from 'lyst-core/dist/constants'
import { IEntity} from 'lyst-core/dist/interfaces';
import { FilterQuery } from 'mongodb';

export interface IController<T extends IEntity> {
  readonly entityType : EntityType;
  get(filter : FilterQuery<T>) : Promise<T[] | T>;
  post(entities : T[]);
  patch(entities : T[]);
  put(entities : T[]);
}