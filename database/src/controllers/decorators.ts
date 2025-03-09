import { EntityType } from "lyst-core/dist/constants";
import 'reflect-metadata';

export function controller(entityType: EntityType) {
  console.log(`controller(${entityType}) evaluated`);
  return function classDecorator<T extends { new(...args: any[]): {} }>(constructor: T) {
    console.log(`controller(${entityType}) constructed`);

    return class extends constructor {
      hello: "no"
    };
  }
}