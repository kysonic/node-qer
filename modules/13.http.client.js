import http from 'node:http';

// GET
http.get('http://jsonplaceholder.typicode.com/todos/1', async (res) => {
    res.on('data', (data) => {
        console.log(data.toString('utf-8'));
    });
});

// OTHER
const req = http.request(
    {
        hostname: 'jsonplaceholder.typicode.com',
        port: 80,
        path: '/posts',
        method: 'POST',
        agent: false,
    },
    (res) => {
        res.on('data', (data) => {
            console.log(data.toString('utf-8'));
        });

        res.on('error', (err) => {
            console.log(err);
        });
    }
);

req.write(JSON.stringify({ data: 1 }));
req.end();
