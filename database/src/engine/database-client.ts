import { Db, ObjectID, FilterQuery, InsertWriteOpResult, BulkWriteOpResultObject } from 'mongodb';
import { fluentProvide } from 'inversify-binding-decorators';
import { MongoDBConnection } from './connection';
import { TYPES } from '../constants';
import { IEntity } from 'lyst-core/dist/interfaces';
import { IDatabaseClient } from '../interfaces';

@fluentProvide(TYPES.IDatabaseClient).inSingletonScope().done()
export class MongoDBClient implements IDatabaseClient{
  private _db: Db

  constructor() {
    console.log("create mongodb client");
    MongoDBConnection.getConnection()
    .then((connection) => {
      this._db = connection;
    })
    .catch(error => {
      console.log(error);
    })
  }

  async find<T extends IEntity>(collection: string, filter: FilterQuery<T>) : Promise<T[]> {
    return this._db.collection(collection).find<T>(filter).toArray();
  }

  async findOneById<T extends IEntity>(collection: string, id: string) : Promise<T> {
    return this._db.collection(collection).findOne<T>({ _id: new ObjectID(id) });
  }

  async insert<T extends IEntity>(collection: string, entities: T[]) : Promise<InsertWriteOpResult> {
    return this._db.collection(collection).insertMany(entities);
  }

  async update<T extends IEntity>(collection: string, entities: T[]) : Promise<BulkWriteOpResultObject> {
    var updateOperations = entities.map((entity) => {
      var { _id, ...rest} = entity;
      return {
        updateOne: {
          filter: { _id: new ObjectID(_id) },
          update: {
            $set: rest
          }
        }
      }
    });

    return this._db.collection(collection).bulkWrite(updateOperations);
  }

  async replace<T extends IEntity>(collection: string, entities: T[]) : Promise<BulkWriteOpResultObject> {
    var replaceOperations = entities.map((entity) => {
      var { _id, ...rest } = entity;
      return {
        replaceOne: {
          filter: { _id: new ObjectID(_id) },
          replacement: rest
        }
      }
    });

    return this._db.collection(collection).bulkWrite(replaceOperations);
  }
}