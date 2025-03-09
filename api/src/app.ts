//imports
import * as SocketIOClient from "socket.io-client";
import * as Express from "express"
import * as Cors from "cors";
import * as BodyParser from "body-parser";
import * as Http from "http";

import LystRouter from "./routers/lyst";

//server constants
const app = Express();
const httpServer = new Http.Server(app);
const port = process.env.PORT || 3001

//socket constants
const socket = SocketIOClient("http://localhost:3002");

async function start() {
  //server configuration
  app.use(Cors());
  app.use(BodyParser.urlencoded({ extended: false }));
  app.use(BodyParser.json());

  //routing
  let lystRouter = new LystRouter();
  app.use(lystRouter.path(), lystRouter.router());

  app.get('/', (req, res) => {
    socket.emit("get", (data, error) => {
      var message = "Nothing."
      if (error) {
        message = `Error: ${error}`
        console.log(message);
      }
      else {
        message = `Data: ${data}`;
        console.log(message);
      }

      res.send(`<h1>${message}</h1>`)
    });
  });

  //start server
  httpServer.listen(port, () => {
    console.log(`listening on *:${port}`);
  });
}

start();