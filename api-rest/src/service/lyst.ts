import { ILyst, IRequest } from 'lyst-core/dist/interfaces'
import { DatabaseClient } from './database';
import { inject } from 'inversify';
import { EntityType, MethodType } from 'lyst-core/dist/constants';

export class LystService {
  constructor(
    @inject(DatabaseClient) private _databaseClient: DatabaseClient
  ) { }

  async getLysts(){
    var request = <IRequest<ILyst>> {
      entityType: EntityType.lyst,
      methodType: MethodType.get
    }

    return await this._databaseClient.sendRequest(request);
  }

  async getLyst(id : string) {
    var request = <IRequest<ILyst>>{
      entityType: EntityType.lyst,
      methodType: MethodType.get,
      body: {
        _id: id
      }
    }

    return this._databaseClient.sendRequest(request);
  }

  async postLysts(lysts : ILyst[]) {
    var request = <IRequest<ILyst>> {
      entityType: EntityType.lyst,
      methodType: MethodType.post,
      body: lysts
    }

    return this._databaseClient.sendRequest(request);
  }

  async patchLysts(lysts: Partial<ILyst>[]) {
    var request = <IRequest<ILyst>>{
      entityType: EntityType.lyst,
      methodType: MethodType.patch,
      body: lysts
    }

    return this._databaseClient.sendRequest(request);
  }

  async putLysts(lysts: ILyst[]) {
    var request = <IRequest<ILyst>>{
      entityType: EntityType.lyst,
      methodType: MethodType.put,
      body: lysts
    }

    return this._databaseClient.sendRequest(request);
  }
}