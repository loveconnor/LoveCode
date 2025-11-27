import { editorServerConfig } from '@fluxly/rpc';
import { createServer } from './server';

const server = createServer(editorServerConfig);

server.start();