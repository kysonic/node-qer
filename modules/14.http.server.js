import { ExpressLikeServer } from './server/server.mjs';

const app = new ExpressLikeServer();

// JSON Body Parser
app.router.use(async (req, res, next) => {
    if (['POST', 'PUT'].includes(req.method)) {
        req.body = await new Promise((resolve, reject) => {
            let body = '';

            req.on('data', (data) => {
                body += data;
            });

            req.on('end', () => {
                try {
                    resolve(body ? JSON.parse(body) : {});
                } catch {
                    reject(new Error('Body is malformed'));
                }
            });
        });
    }

    next();
});

app.router.get('/', (req, res) => {
    res.json({
        data: 1,
    });
});

app.router.post('/', (req, res) => {
    console.log(req.body);

    res.json({
        saved: true,
    });
});

app.listen(8080, () => {
    console.log('Server is running on 8080');
});
