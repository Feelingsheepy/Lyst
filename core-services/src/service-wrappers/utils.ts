import { ResponseObject } from '../types';
import * as SocketIOClient from 'socket.io-client';

let socket : SocketIOClient.Socket;
let isRegistered = false;
let isRegistering = false;

export function getSocket(authentication?: string) {
  if(!isRegistered && !isRegistering && authentication) registerClient(authentication);

  return socket;
}

function registerClient(authentication: string) {
  if (isRegistered || isRegistering) return;

  socket = SocketIOClient.io('http://0.0.0.0:3000');
  isRegistering = true;

  console.log("Registering to communication service " + socket.active);

  socket.on("register", (callback) => {
    callback(authentication);
    console.log("Connected to communication service");
    isRegistering = false;
    isRegistered = true;
  });
}

export async function resolveMethod<T>(serviceName: string, methodName: string, ...body) : Promise<T> {
  return new Promise((resolve, reject) => {
    awaitRegistration()
    .then(() => {
      socket.send(serviceName, methodName, body, (response: ResponseObject) => {
        if (response.error == null || response.error === undefined) {
          resolve(response.result);
        }
        else {
          reject(response.error);
        }
      });
    });
  });
}

export function runMethod(serviceName: string) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    descriptor.value = (...args) => {
      return resolveMethod(serviceName, propertyKey, ...args);
    }
  }
}

export function registerService(serviceName: string, service: any) {
  registerClient(serviceName);
  awaitRegistration()
  .then(() => {
    for (var prop in service) {
      console.log(prop);
      setupServiceMethod(service, prop);
    }
  });
}

function setupServiceMethod(service, method: string) {
  socket.on(method, (body, respond) => {
    service[method](...body)
    .then((result) => {
      respond(<ResponseObject>{ result });
    })
    .catch((error) => {
      var test = <ResponseObject>{ error }
      respond(test);
    });
  });
}

async function awaitRegistration() {
  if(!isRegistering && !isRegistered) throw { error: 'registration is not happening' };
  else if(isRegistered) return;

  return new Promise<void>((resolve) => {
    delay()
    .then(() => {
      awaitRegistration()
      .then(() => {
        resolve();
      });
    })
  })
}

function delay() {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, 10);
  });
}