import { EditablePropType } from "../../constants";

export interface IEditableProp<T> {
  name: string;
  propName: string;
  type: EditablePropType;
  value: T;
}