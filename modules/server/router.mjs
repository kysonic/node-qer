import { URL } from 'node:url';

export class Router {
    constructor() {
        this.routes = {
            GET: {},
            POST: {},
            PUT: {},
            DELETE: {},
        };

        this.middlewares = [];
    }

    get(path, handler) {
        this.routes.GET[path] = handler;
    }

    post(path, handler) {
        this.routes.POST[path] = handler;
    }

    put(path, handler) {
        this.routes.PUT[path] = handler;
    }

    delete(path, handler) {
        this.routes.DELETE[path] = handler;
    }

    use(middleware) {
        this.middlewares.push(middleware);
    }

    async handleRequest(req, res) {
        // Pimp my response
        this.#_enhanceResponse(res);
        // Go through middlewares
        for (let middleware of this.middlewares) {
            await new Promise((resolve, reject) => {
                middleware(req, res, () => resolve());
            });
        }

        // Find concrete router
        const method = req.method;
        const url = new URL(req.url, `http://${req.headers.host}`);
        const pathname = url.pathname;

        const routeHandler = this.routes[method]?.[pathname];

        if (routeHandler) {
            try {
                await routeHandler(req, res);
            } catch (error) {
                this._sendError(res, 500, error.message);
            }
        } else {
            this._sendError(res, 404, `Route ${method} ${pathname} not found`);
        }
    }

    // Patch response for convenient methods
    #_enhanceResponse(res) {
        // JSON
        res.json = (data, statusCode = 200) => {
            res.writeHead(statusCode, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(data));
        };
        // JSON or TEXT
        res.send = (data, statusCode = 200) => {
            if (typeof data === 'object') {
                res.json(data, statusCode);
            } else {
                res.writeHead(statusCode, { 'Content-Type': 'text/plain' });
                res.end(data);
            }
        };
    }

    #_sendError(res, statusCode, message) {
        res.json({ error: message }, statusCode);
    }
}
