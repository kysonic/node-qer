import http from 'node:http';
import { setTimeout as delay } from 'node:timers/promises';
import { AsyncLocalStorage } from 'node:async_hooks';

const asyncLocalStorage = new AsyncLocalStorage();

function logWithId(msg) {
    const id = asyncLocalStorage.getStore();

    console.log(id, msg);
}

let idSeq = 0;
http.createServer((req, res) => {
    asyncLocalStorage.run(idSeq++, async () => {
        logWithId('start');

        await delay(1000);

        setImmediate(() => {
            logWithId('end');

            res.end();
        });
    });
}).listen(8080);
