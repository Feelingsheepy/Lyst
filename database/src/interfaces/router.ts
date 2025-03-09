import { IRequest, IEntity } from 'lyst-core/dist/interfaces';

export interface IRouter {
  route(request : IRequest<IEntity>) : Promise<any>;
}