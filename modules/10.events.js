import { EventEmitter } from 'node:events';

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on('message', (payload) => {
    console.log(payload);
});

myEmitter.emit('message', { payload: () => {} });
