const { Readable, Writable } = require('stream');

class MyReadableStream extends Readable {
  constructor(options) {
    super(options);
    this.data = ['chunk1', 'chunk2', 'chunk3', 'chunk4', 'chunk5'];
    this.index = 0;
  }

  _read(size) {
    if (this.index < this.data.length) {
      this.push(this.data[this.index]);
      this.index++;
    } else {
      this.push(null); // Signal end of stream
    }
  }
}

class MyWritableStream extends Writable {
  constructor(options) {
    super(options);
  }

  _write(chunk, encoding, callback) {
    // Simulate some processing delay
    setTimeout(() => {
      console.log('Processing:', chunk.toString());
      callback(); // Indicate that the chunk has been processed
    }, 100);
  }
}

const readable = new MyReadableStream();
const writable = new MyWritableStream();

readable.on('data', (chunk) => {
  const canContinue = writable.write(chunk);
  if (!canContinue) {
    console.log('Pausing readable stream...');
    readable.pause();
  }
});

writable.on('drain', () => {
  console.log('Writable stream drained. Resuming readable stream...');
  readable.resume();
});

readable.on('end', () => {
  writable.end();
  console.log('Readable stream ended.');
});

writable.on('finish', () => {
  console.log('Writable stream finished.');
});