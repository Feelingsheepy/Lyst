import { Socket } from 'socket.io-client';
import { getSocket } from './utils'

export abstract class ServiceWrapper {
  protected _socket : Socket;
  
  constructor(authentication?: string) {
    this._socket = getSocket(authentication);
  }
}