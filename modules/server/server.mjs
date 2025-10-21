import http from 'node:http';

import { Router } from './router.mjs';

export class ExpressLikeServer {
    constructor() {
        this.router = new Router();
        this.server = http.createServer((req, res) => {
            this.router.handleRequest(req, res);
        });
    }

    listen(port, callback) {
        this.server.listen(port, callback);
    }
}
