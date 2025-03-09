import { inject, multiInject } from 'inversify';
import { fluentProvide } from 'inversify-binding-decorators'
import { TYPES } from '../constants';
import { IController, IRouter, IValidationService } from '../interfaces';
import { EntityType, MethodType } from 'lyst-core/dist/constants';
import { IRequest, IEntity } from 'lyst-core/dist/interfaces';

@fluentProvide(TYPES.IRouter).inSingletonScope().done()
export class Router implements IRouter{
  private readonly _controllers : Map<EntityType, IController<IEntity>> = new Map();
  private readonly _validationService : IValidationService;

  constructor(
    @multiInject(TYPES.IController) controllers: IController<IEntity>[],
    @inject(TYPES.IValidationService) validationService : IValidationService
  ) {
    controllers.forEach(i => this._controllers.set(i.entityType, i));
    this._validationService = validationService;
  }

  async route(request : IRequest<IEntity>) {
    let controller = this._controllers.get(request.entityType);
    return this._validationService.validate(request.entityType, request.methodType, request.body)
    .then(() => {
      return controller[MethodType[request.methodType]](request.body);
    })
    .catch((error) => {
      return error;
    });
  }
}