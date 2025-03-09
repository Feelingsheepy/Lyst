import { Db, MongoClient } from 'mongodb';

const connectionString = 'mongodb://localhost:27017';
const databaseName = 'Lyst';

export class MongoDBConnection {
  private static isConnected: boolean = false;
  private static db: Db;

  public static async getConnection() {
    if(this.isConnected) {
      return this.db;
    }
    else {
      //The error will be passed up here
      return await this.connect();
    }
  }

  private static async connect() {
    //The error will be passed up here
    var client = await MongoClient.connect(connectionString, { useNewUrlParser: true});
    this.db = client.db(databaseName);
    this.isConnected = true;
    return this.db;
  }
}