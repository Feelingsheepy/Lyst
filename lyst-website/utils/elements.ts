import { IBaseElement } from 'lyst-core/dist/interfaces';
import IRenderElement from '~/interfaces/render-element';
import { BaseElementType } from 'lyst-core/dist/constants';
import BuildElement from '~/models/build-element';

export function createNewElement(type: BaseElementType) : IRenderElement {
  const baseElement = <IBaseElement>{
    type,
    name: '',
    _id: '',
    editableProps: []
  }

  return new BuildElement(baseElement);
}

export function buildToBaseElement(buildElement: IRenderElement) : IBaseElement {
  return <IBaseElement>{
    _id: buildElement.id,
    editableProps: buildElement.editableProps,
    name: buildElement.dataObject.props.value,
    type: buildElement.baseElementType
  }
}