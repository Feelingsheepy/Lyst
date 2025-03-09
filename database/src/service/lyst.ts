import { inject } from 'inversify';
import { fluentProvide } from 'inversify-binding-decorators';
import { ILyst } from 'lyst-core/dist/interfaces';
import { IService, IDatabaseClient } from '../interfaces';
import { TYPES } from '../constants';
import { EntityType } from 'lyst-core/dist/constants';
import { FilterQuery } from 'mongodb';

const entityName = EntityType[EntityType.lyst]

@fluentProvide(TYPES.IService).inSingletonScope().whenTargetNamed(entityName).done()
export class LystService implements IService<ILyst>{
  private _databaseClient: IDatabaseClient;

  constructor(
    @inject(TYPES.IDatabaseClient) databaseClient: IDatabaseClient
  ) {
    this._databaseClient = databaseClient;
  }

  async get(filter : FilterQuery<ILyst>) {
    if(filter &&
      typeof filter._id == 'string') {
      return this._databaseClient.findOneById<ILyst>(entityName, filter._id);
    }
    return this._databaseClient.find<ILyst>(entityName, filter);
  }

  async create(lysts : ILyst[]) {
    return this._databaseClient.insert(entityName, lysts);
  }

  async update(lysts : ILyst[]) {
    return this._databaseClient.update(entityName, lysts);
  }

  async replace(lysts: ILyst[]) {
    return this._databaseClient.replace(entityName, lysts);
  }
}