import * as Express from "express"

const router = Express.Router();

interface IRouter {
  routerName(): string;
  path() : string;
  router() : Express.Router;
}

export default abstract class Router implements IRouter {
  abstract routerName();

  path() {
    return `/${this.routerName()}`;
  }

  router() {
    return router;
  }
}