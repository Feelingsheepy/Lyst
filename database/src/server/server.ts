import * as SocketIO from 'socket.io';
import { inject } from 'inversify';
import { fluentProvide } from 'inversify-binding-decorators';
import { TYPES } from '../constants';
import { IServer, IRouter } from '../interfaces';
import { IRequest, IEntity } from 'lyst-core/dist/interfaces';

const port = process.env.PORT || 3002

@fluentProvide(TYPES.IServer).inSingletonScope().done()
export class SocketServer implements IServer {
  private readonly _server: SocketIO.Server;
  private _router: IRouter;

  constructor (
    @inject(TYPES.IRouter) router : IRouter
  ) {
    this._router = router;
    this._server = SocketIO();
  }

  async start() {
    this._server.on('connection', (socket) => {
      console.log(`connection received`);
      
      socket.on('message', (request : IRequest<IEntity>, callback) => {
        this._router.route(request)
        .then((response) => {
          callback(response);
        });
      });
    });

    this._server.listen(port);
    console.log(`Listening on port ${port}`);
  }
}