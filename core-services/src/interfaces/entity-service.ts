import { IEntity } from 'lyst-core/dist/interfaces';
import { EntityType } from 'lyst-core/dist/constants';
import { Filter, InsertOneResult, BulkWriteResult } from 'mongodb';

export interface IEntityService {
  fetch<T extends IEntity>(entityType: EntityType, query: Filter<T>) : Promise<T[]>;
  fetchOne<T extends IEntity>(entityType: EntityType, id: string) : Promise<T>;
  create<T extends IEntity>(entityType: EntityType, entities: T[]) : Promise<InsertOneResult<T>>;
  update<T extends IEntity>(entityType: EntityType, entities: T[]) : Promise<BulkWriteResult>;
}