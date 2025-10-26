// Request -> Response Cycle Explained

import http from 'node:http';
import { setTimeout as delay } from 'node:timers/promises';

const server = http.createServer((req, res) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);

    const url = new URL(req.url, `http://${req.headers.host}`);

    if (url.pathname === '/api/data' && req.method === 'GET') {
        handleDataRequest(req, res);
    } else if (url.pathname === '/api/users' && req.method === 'POST') {
        handleUserPost(req, res);
    } else {
        handleNotFound(req, res);
    }
});

async function handleDataRequest(req, res) {
    await delay(1000);

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ data: [1, 2, 3], timestamp: Date.now() }));
}

function handleUserPost() {
    let body = '';
  
    req.on('data', chunk => {
        body += chunk.toString();
    });
    
    req.on('end', async () => {
        try {
        const userData = JSON.parse(body);
        
        if (!userData.name) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({ error: 'Name is required' }));
        }
        
        await delay(500);

        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ 
            id: Math.random().toString(36).substr(2, 9),
            ...userData,
            created: new Date().toISOString()
        }));
        
        } catch (error) {
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid JSON' }));
        }
    });
}

function handleNotFound(req, res) {
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not Found', path: req.url }));
}

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});


process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(() => {
    console.log('Process terminated');
    process.exit(0);
  });
});