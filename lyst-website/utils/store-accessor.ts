import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'

import BuildModule from '~/store/build'
let buildStore: BuildModule

function initialiseStores(store: Store<any>): void {
  buildStore = getModule(BuildModule, store)
}

export { initialiseStores, buildStore }
