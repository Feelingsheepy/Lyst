import { IEntity } from "lyst-core/dist/interfaces";
import { FilterQuery, InsertWriteOpResult, BulkWriteOpResultObject } from 'mongodb';

export interface IDatabaseClient {
  find<T extends IEntity>(collection: string, filter: FilterQuery<T>) : Promise<T[]>;
  findOneById<T extends IEntity>(collection: string, id: string) : Promise<T>;
  insert<T extends IEntity>(collection: string, entities: T[]) : Promise<InsertWriteOpResult>;
  update<T extends IEntity>(collection: string, entities: T[]) : Promise<BulkWriteOpResultObject>;
  replace<T extends IEntity>(collection: string, entities: T[]) : Promise<BulkWriteOpResultObject>;
}