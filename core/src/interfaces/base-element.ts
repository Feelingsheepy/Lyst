import { IEntity } from "./entity";
import { BaseElementType } from "../constants";
import { IEditableProp } from "./editable-props";

export interface IBaseElement extends IEntity {
  name: string;
  type: BaseElementType;
  editableProps: IEditableProp<any>[]
}

export interface IBaseElements extends IEntity {
  lystID: string;
  elements: IBaseElement[];
}