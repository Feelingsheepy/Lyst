import * as SocketIOClient from 'socket.io-client';
import { fluentProvide } from 'inversify-binding-decorators';
import { IRequest, IEntity } from 'lyst-core/dist/interfaces';

const socket = SocketIOClient("http://localhost:3002");

const provideSingleton = function(identifier) {
  return fluentProvide(identifier)
    .inSingletonScope()
    .done();
}

@provideSingleton(DatabaseClient)
export class DatabaseClient {
  constructor() {
    console.log(`new db client`);
  }

  async sendRequest<T extends IEntity>(request : IRequest<T>) : Promise<T[]> { 
    return new Promise((resolve, reject) => {
      socket.send(request, (response) => {
        resolve(response);
      });
    })
    
  }
}