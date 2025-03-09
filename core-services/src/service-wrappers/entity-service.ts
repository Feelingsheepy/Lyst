import { IEntityService } from "../interfaces";
import { ServiceWrapper } from "./service-wrapper";
import { runMethod } from "./utils";
import { ServiceNames } from "../constants";
import { Filter, InsertOneResult, BulkWriteResult } from 'mongodb';
import { IEntity } from "lyst-core/dist/interfaces";
import { EntityType } from "lyst-core/dist/constants"

export class EntityService extends ServiceWrapper implements IEntityService {
  @runMethod(ServiceNames.IEntityService)
  fetch<T extends IEntity>(entityType: EntityType, query: Filter<T>): Promise<T[]> {
    return;
  }

  @runMethod(ServiceNames.IEntityService)
  fetchOne<T extends IEntity>(entityType: EntityType, id: string): Promise<T> {
    return;
  }

  @runMethod(ServiceNames.IEntityService)
  create<T extends IEntity>(entityType: EntityType, entities: T[]): Promise<InsertOneResult<T>> {
    return;
  }

  @runMethod(ServiceNames.IEntityService)
  update<T extends IEntity>(entityType: EntityType, entities: T[]): Promise<BulkWriteResult> {
    return;
  }
}