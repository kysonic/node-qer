import { spawn } from 'node:child_process';
import { fork } from 'node:child_process';
import process from 'node:process';

const ls = spawn('touch', ['a.txt']);

// Out
ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
});

// Error
ls.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
});

// Close
ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});

// Fork

if (process.argv[2] === 'child') {
  setTimeout(() => {
    console.log(`Hello from ${process.argv[2]}!`);
  }, 1_000);
} else {
  const controller = new AbortController();
  const { signal } = controller;
  const child = fork(import.meta.url, ['child'], { signal });
  child.on('error', (err) => {
    // This will be called with err being an AbortError if the controller aborts
    console.log(err);
  });
  controller.abort(); // Stops the child process
}
