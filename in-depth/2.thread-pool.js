import { scrypt, randomBytes } from 'node:crypto';

// UV_THREADPOOL_SIZE=4 node ./thread-pool/1.js 
// UV_THREADPOOL_SIZE=8 node ./thread-pool/1.js 

const SALT = randomBytes(16).toString('hex');

for (let i = 0; i < 5; i++) {
    let start = performance.now();
    scrypt(`pass${i}`, SALT, 16, (_, key) => {
        console.log(key.toString('hex'), i, performance.now() - start);
    });
}
