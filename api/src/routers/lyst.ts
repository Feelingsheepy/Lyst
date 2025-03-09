import Router from "./router";

export default class LystRouter extends Router {
  constructor() {
    super();

    this.router().get('/', (req, res) => {
      res.send(`<h1>get ${this.path()}/</h1>`);
    });
  }

  routerName() {
    return "lysts";
  }
}