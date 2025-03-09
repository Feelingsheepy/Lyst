import { IEntityService } from 'lyst-core-services/dist/interfaces';
import { EntityType } from 'lyst-core/dist/constants';
import { IEntity } from 'lyst-core/dist/interfaces';
import { FilterQuery } from 'mongodb';
import { DatabaseService } from 'lyst-core-services/dist/service-wrappers';

const databaseService = new DatabaseService();
let isConnected = false;

const service = <IEntityService>{
  async fetch<T extends IEntity>(entityType: EntityType, query: FilterQuery<T>) : Promise<T[]> {
    return databaseService.find(EntityType[entityType], query);
  },
  async fetchOne<T extends IEntity>(entityType: EntityType, id: string) : Promise<T> {
    return databaseService.findOneById(EntityType[entityType], id);
  },
  async create<T extends IEntity>(entityType: EntityType, entities: T[]) {
    return databaseService.insert(EntityType[entityType], entities);
  },
  async update<T extends IEntity>(entityType: EntityType, entities: T[]) {
    return databaseService.update(EntityType[entityType], entities);
  }
};

export async function getService(): Promise<IEntityService> {
  if(isConnected) throw { error: "Cannot have multiple instances of service." };
  
  isConnected = true;
  return service;
}