import * as Express from 'express';
import { controller, httpGet } from 'inversify-express-utils';

@controller("/")
export class HomeController {
  
  @httpGet("/")
  public async get(req: Express.Request, res: Express.Response, next: Express.NextFunction) {
    res.send({ test: "Home mabru" });
  }
}