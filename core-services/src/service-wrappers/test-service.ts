import { ITestService } from "../interfaces";
import { ServiceWrapper } from "./service-wrapper";
import { resolveMethod } from "./utils";
import { ServiceNames } from "../constants";

export class TestService extends ServiceWrapper implements ITestService {
  async doThing() : Promise<string> {
    return resolveMethod(ServiceNames.ITestService, this.doThing.name);
  }
}