import { Db, MongoClient, FilterQuery, InsertWriteOpResult, BulkWriteOpResultObject, ObjectID } from 'mongodb';
import { IDatabaseService } from 'lyst-core-services/dist/interfaces';
import { IEntity } from 'lyst-core/dist/interfaces';

const connectionString = 'mongodb://localhost:27017';
const databaseName = 'Lyst';

let client : MongoClient;
let db : Db;
let isConnecting = false;
let isConnected = false;

const service = <IDatabaseService> {
  async find<T extends IEntity>(collection: string, filter: FilterQuery<T>): Promise<T[]> {
    console.log(`find: ${collection} + ${filter}`);
    return db.collection(collection).find<T>(filter).toArray();
  },
  async findOneById<T extends IEntity>(collection: string, id: string): Promise<T> {
    console.log(`findOneById: ${collection} + ${id}`);
    return db.collection(collection).findOne<T>({ _id: new ObjectID(id) });
  },
  async insert<T extends IEntity>(collection: string, entities: T[]): Promise<InsertWriteOpResult<T>> {
    console.log(`insert: ${collection} + ${entities}`);
    return db.collection(collection).insertMany(entities);
  },
  async update<T extends IEntity>(collection: string, entities: T[]): Promise<BulkWriteOpResultObject> {
    console.log(`update: ${collection} + ${entities}`);
    var updateOperations = entities.map((entity) => {
      var { _id, ...rest } = entity;
      return {
        updateOne: {
          filter: { _id: new ObjectID(_id) },
          update: {
            $set: rest
          }
        }
      }
    });

    return db.collection(collection).bulkWrite(updateOperations);
  },
  async replace<T extends IEntity>(collection: string, entities: T[]): Promise<BulkWriteOpResultObject> {
    console.log(`replace: ${collection} + ${entities}`);
    var replaceOperations = entities.map((entity) => {
      var { _id, ...rest } = entity;
      return {
        replaceOne: {
          filter: { _id: new ObjectID(_id) },
          replacement: rest
        }
      }
    });

    return db.collection(collection).bulkWrite(replaceOperations);
  }
}

export async function getService() : Promise<IDatabaseService> {
  if(!isConnected && !isConnecting) {
    isConnecting = true;
    return new Promise((resolve, reject) => {
      MongoClient.connect(connectionString, { useNewUrlParser: true })
      .then((_client) => {
        client = _client;
        db = client.db(databaseName);
        isConnected = false;
        resolve(service);
      })
      .catch((error) => {
        isConnecting = false;
        reject(error);
      });
    })
  }
  else throw { error: 'Cannot have multiple services' }
}

