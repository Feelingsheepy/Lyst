import { Module, VuexModule, Action, Mutation } from 'vuex-module-decorators'
import { EntityService } from 'lyst-core-services/dist/service-wrappers/entity-service'
import { ILyst, IBaseElement, IBaseElements } from 'lyst-core/dist/interfaces'
import { EntityType } from 'lyst-core/dist/constants'
import IRenderElement from '~/interfaces/render-element'
import BuildElement from '~/models/build-element'

const entityService = new EntityService('browser')

@Module({
  name: 'build',
  stateFactory: true,
  namespaced: true
})
class BuildModule extends VuexModule {
  wheels: Number = 2
  createToolboxOpen = false
  selectedLyst = <ILyst>{}
  elements = <IRenderElement[]>[]
  availableLysts: ILyst[] = []

  @Mutation
  setCreateToolboxOpen(value: boolean) {
    this.createToolboxOpen = value
  }

  @Mutation
  setSelectedLyst(lyst: ILyst) {
    this.selectedLyst = lyst
  }

  @Mutation
  setAvailableLysts(lysts: ILyst[]) {
    this.availableLysts = lysts
  }

  @Mutation
  setElements(baseElements: IBaseElement[]) {
    this.elements = baseElements.map(x => new BuildElement(x))
  }

  @Mutation
  addElement(element: IRenderElement) {
    this.elements.push(element)
  }

  @Action
  async fetchAvailableLysts() {
    const lysts = await entityService.fetch<ILyst>(EntityType.lyst, {})
    this.setAvailableLysts(lysts)
  }

  @Action updateSelectedLyst(lyst: ILyst) {
    this.setSelectedLyst(lyst)
    this.fetchElements()
  }

  @Action
  async fetchElements() {
    if(this.selectedLyst.elementsID !== undefined) {
      const baseElements = await entityService.fetchOne<IBaseElements>(EntityType.base_elements, this.selectedLyst.elementsID)
      this.setElements(baseElements.elements)
    }
    else {
      this.setElements([])
    }
  }
}

export default BuildModule
