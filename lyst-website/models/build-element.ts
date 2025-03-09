import IRenderElement from '~/interfaces/render-element';
import { IBaseElement } from 'lyst-core/dist/interfaces';
import { BaseElementType } from 'lyst-core/dist/constants';
import IDataObject from '~/interfaces/data-object';
import { IEditableProp } from 'lyst-core/dist/interfaces/editable-props';
import { renderTypeDescriptors } from '~/utils/render-type-descriptors';

export default class BuildElement implements IRenderElement {
  id: string;
  baseElementType: BaseElementType;
  content?: string;
  dataObject: IDataObject;
  editableProps: IEditableProp<any>[];
  type: string;

  constructor(baseElement: IBaseElement) {
    var typeDescriptor = renderTypeDescriptors[baseElement.type];

    this.id = baseElement._id;
    this.baseElementType = baseElement.type;
    this.type = 'v-text-field';
    this.editableProps = { ...typeDescriptor.editableProps, ...baseElement.editableProps }; // merge them with spread operator (right most is kept for key collisions)
    this.dataObject = {
      props: {
        label: typeDescriptor.label,
        placeholder: typeDescriptor.placeholder,
        value: baseElement.name
      }
    }
  }
}