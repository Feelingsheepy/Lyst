import { BaseElementType } from 'lyst-core/dist/constants';
import { IEditableProp } from 'lyst-core/dist/interfaces/editable-props';
import IDataObject from './data-object';

export default interface IRenderElement {
  id: string;
  baseElementType: BaseElementType;
  type: string;
  dataObject: IDataObject;
  content?: string;
  editableProps: IEditableProp<any>[];
}