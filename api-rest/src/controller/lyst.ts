import { controller, httpGet, httpPost, httpPatch, httpPut, requestParam, requestBody } from 'inversify-express-utils'
import { inject } from 'inversify';
import { LystService } from '../service';

@controller('/lyst')
export class LystController {
  constructor(
    @inject(LystService) private _lystService: LystService
  ) { }

  @httpGet('/')
  async getLysts() {
    return this._lystService.getLysts();
  }

  @httpGet('/:id')
  async getLyst(@requestParam('id') id: string) {
    return this._lystService.getLyst(id);
  }

  @httpPost('/')
  async postLysts(@requestBody() lysts) {
    return this._lystService.postLysts(lysts);
  }

  @httpPatch('/')
  async patchLysts(@requestBody() lysts) {
    return this._lystService.patchLysts(lysts);
  }

  @httpPut('/')
  async putLysts(@requestBody() lysts) {
    return this._lystService.putLysts(lysts);
  }
}