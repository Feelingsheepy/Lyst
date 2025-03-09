import { Container } from "inversify";
import { autoProvide, buildProviderModule } from 'inversify-binding-decorators';

import './loader';

let container = new Container();
container.load(buildProviderModule());

export { container };