import { IEntity } from "lyst-core/dist/interfaces";
import { FilterQuery } from 'mongodb';

export interface IService<T extends IEntity> {
  get(filter : FilterQuery<T>) : Promise<T[] | T>;
  create(entities : T[]);
  update(entities : T[]);
  replace(entities : T[]);
}