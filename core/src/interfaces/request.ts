import { EntityType, MethodType } from "../constants";
import { IEntity } from "./entity";

export interface IRequest<T extends IEntity> {
  entityType : EntityType;
  methodType : MethodType;
  body;
}