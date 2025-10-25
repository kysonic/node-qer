import { debuglog, promisify } from 'node:util';
import { stat } from 'node:fs';

let log = debuglog('internals', (debug) => {
  // Replace with a logging function that optimizes out
  // testing if the section is enabled
  log = debug;
});

const promisifiedStat = promisify(stat);

const st = await promisifiedStat('.');