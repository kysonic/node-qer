// Event Driven API
import { EventEmitter } from "node:events";
import http from 'node:http';

class EventDrivenUser extends EventEmitter {
    constructor() {
        super();

        this.user = null;
    }

    createUser(user) {
        this.user = user; 

        this.emit('user:registered', user);
    }
}

const edu = new EventDrivenUser();


const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (url.pathname === '/' && req.method === 'POST') {
        let body = '';
        let error = '';

        req.on('data', (chunk) => {
            body+= chunk;
        });

        req.on('error', (err) => {
            error+= err;
        });

        req.on('end', () => {
            if (body) {
                try {
                    const json = JSON.parse(body);

                    edu.createUser(json);

                    res.writeHead(201, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({
                        success: true,
                        user: json
                    }));
                } catch(err) {
                    res.writeHead(401, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({
                        success: false,
                        message: 'Bad user input'
                    }));
                }
            }

            if (error) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({
                    success: false,
                    message: 'Something gone wrong'
                }));
            }
        });

    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            success: false,
            message: 'Page is not found'
        }));
    }
});


server.listen(3000, () => {
    console.log('Run boy run at 3000');
});

server.on('close', () => {
    console.log('I dropped ....');
});

// Let's imagine it is 3-party server to send somewhere 
edu.on('user:registered', (user) => {
    console.log(user, '<<<from service');
});

// Graceful shutdown
process.on('SIGTERM', () => {
    server.close();
});