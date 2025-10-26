import { createWriteStream } from 'node:fs';
import { Console } from 'node:console';

console.log('hello world');

console.log('hello %s', 'world');

console.error(new Error('Whoops, something bad happened'));

const name = 'Hugo';
console.warn(`Danger ${name}! Danger!`);

console.assert(false, 'Whoops %s work', 'didn\'t');

// Simple logger without dependencies!

const output = createWriteStream('./stdout.log');
const errorOutput = createWriteStream('./stderr.log');

const logger = new Console({ stdout: output, stderr: errorOutput });

const count = 5;
logger.log('count: %d', count);
logger.error(new Error('OMG!'))