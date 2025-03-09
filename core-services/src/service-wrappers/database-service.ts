import { IDatabaseService } from "../interfaces";
import { ServiceWrapper } from "./service-wrapper";
import { runMethod } from "./utils";
import { ServiceNames } from "../constants";
import { Filter, InsertManyResult, BulkWriteResult } from 'mongodb';
import { IEntity } from "lyst-core/dist/interfaces";

export class DatabaseService extends ServiceWrapper implements IDatabaseService {
  @runMethod(ServiceNames.IDatabaseService)
  find<T extends IEntity>(collection: string, filter: Filter<Document>): Promise<T[]> {
    return Promise.resolve([]);
  }

  @runMethod(ServiceNames.IDatabaseService)
  findOneById<T extends IEntity>(collection: string, id: string): Promise<T> {
    return Promise.resolve(null as T);
  }

  @runMethod(ServiceNames.IDatabaseService)
  insert<T extends IEntity>(collection: string, entities: T[]): Promise<InsertManyResult<T>> {
    return Promise.resolve({} as InsertManyResult<T>);
  }

  @runMethod(ServiceNames.IDatabaseService)
  update<T extends IEntity>(collection: string, entities: T[]): Promise<BulkWriteResult> {
    return Promise.resolve({} as BulkWriteResult);
  }
  
  @runMethod(ServiceNames.IDatabaseService)
  replace<T extends IEntity>(collection: string, entities: T[]): Promise<BulkWriteResult> {
    return Promise.resolve({} as BulkWriteResult);
  }
}