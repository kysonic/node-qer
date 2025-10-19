const fs = require('node:fs');

fs.readFile('./test.txt', () => {
    setTimeout(() => {
        console.log('timeout');
    }, 0);
    setImmediate(() => {
        console.log('immediate');
    });
});
