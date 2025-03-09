import { inject, named } from 'inversify';
import { fluentProvide } from 'inversify-binding-decorators';
import { IService, IController, IValidationService } from "../interfaces";
import { TYPES } from '../constants';
import { ILyst } from 'lyst-core/dist/interfaces';
import { EntityType } from 'lyst-core/dist/constants';
import { FilterQuery } from 'mongodb';
import { controller } from './decorators';

@controller(EntityType.lyst)
@fluentProvide(TYPES.IController).inSingletonScope().done()
export class LystController implements IController<ILyst> {
  private readonly _lystService : IService<ILyst>;
  readonly entityType = EntityType.lyst;

  constructor(
    @inject(TYPES.IService) @named(EntityType[EntityType.lyst]) lystService: IService<ILyst>,
  ){
    this._lystService = lystService;
  }

  public async get(filter : FilterQuery<ILyst>) {
    return this._lystService.get(filter);
  }

  public async post(lysts : ILyst[]) {
    return this._lystService.create(lysts);
  }

  public async patch(lysts : ILyst[]) {
    return this._lystService.update(lysts);
  }

  public async put(lysts: ILyst[]) {
    return this._lystService.replace(lysts);
  }
}