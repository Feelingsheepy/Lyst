import { IEntity } from 'lyst-core/dist/interfaces';
import { Document, Filter, InsertManyResult, BulkWriteResult } from 'mongodb';

export interface IDatabaseService {
  find<T extends IEntity>(collection: string, filter: Filter<Document>) : Promise<T[]>;
  findOneById<T extends IEntity>(collection: string, id: string) : Promise<T>;
  insert<T extends IEntity>(collection: string, entities: T[]) : Promise<InsertManyResult<T>>;
  update<T extends IEntity>(collection: string, entities: T[]) : Promise<BulkWriteResult>;
  replace<T extends IEntity>(collection: string, entities: T[]) : Promise<BulkWriteResult>;
}