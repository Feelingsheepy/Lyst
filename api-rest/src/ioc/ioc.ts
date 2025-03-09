import { Container } from "inversify";
import { autoProvide, buildProviderModule } from 'inversify-binding-decorators';
import * as services from '../service';

let container = new Container();
autoProvide(container, services);
container.load(buildProviderModule());

export { container };