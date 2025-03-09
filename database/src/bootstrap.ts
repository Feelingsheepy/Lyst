import 'reflect-metadata';
import { container } from './ioc/ioc';
import { TYPES } from './constants';
import { IServer } from './interfaces';

let server = container.get<IServer>(TYPES.IServer);
server.start();