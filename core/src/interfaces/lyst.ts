import { IEntity } from "./entity";

export interface ILyst extends IEntity {
  name: string;
  description: string;
  elementsID?: string;
}