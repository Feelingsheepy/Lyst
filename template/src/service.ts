import { ITestService } from 'lyst-core-services/dist/interfaces';

let isConnected = false;

const service = <ITestService>{
  async doThing() {
    return "Zero thing to do";
  }
};

export async function getService() : Promise<ITestService> {
  if(isConnected) throw { error: "Cannot have multiple instances of service." };
  
  isConnected = true;
  return service;
}