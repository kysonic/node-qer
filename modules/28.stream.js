import { pipeline } from 'node:stream/promises';
import { Readable, Writable, Duplex, Transform } from 'node:stream';
import { createReadStream, createWriteStream } from 'node:fs';
import { createGzip } from 'node:zlib';

// Gzip
await pipeline(
  createReadStream('archive.tar'),
  createGzip(),
  createWriteStream('archive.tar.gz'),
);
console.log('Pipeline succeeded.');


class NumbersStream extends Readable {
    constructor(maxNumbers, options) {
        super(options);
        this.current = 1;
        this.maxNumbers = maxNumbers;
    }

    _read() {
        if (this.current > this.maxNumbers) {
            this.push(null); 
        } 
        else {
            const number = this.current++;
            this.push(number.toString() + '\n'); // Add to stream
        }
    }
}

const nStream = new NumbersStream(5);

// Looks like iterator somehow
nStream.on('data', (chunk) => {
  console.log('Получено:', chunk.toString());
});

// Writeable

class LoggerStream extends Writable {
  _write(chunk, encoding, callback) {
    console.log(`LOG: ${chunk.toString()}`);
    callback(); // Вызываем callback когда запись завершена
  }
}

const logger = new LoggerStream();
logger.write('Первое сообщение\n');
logger.write('Второе сообщение\n');
logger.end('Последнее сообщение\n');

// Duplex

class UpperCaseStream extends Duplex {
  constructor(options) {
    super(options);
    this.buffer = '';
  }

  _write(chunk, encoding, callback) {
    this.buffer += chunk.toString().toUpperCase();
    callback();
  }

  _read(size) {
    if (this.buffer.length === 0) {
      this.push(null);
    } else {
      this.push(this.buffer.slice(0, size));
      this.buffer = this.buffer.slice(size);
    }
  }
}

// Использование
const upperStream = new UpperCaseStream();

upperStream.on('data', (chunk) => {
  console.log('Преобразованные данные:', chunk.toString());
});

upperStream.write('hello ');
upperStream.write('world');
upperStream.end();

// Transform 

class WordCountTransform extends Transform {
  constructor(options) {
    super(options);
    this.wordCount = 0;
  }

  _transform(chunk, encoding, callback) {
    const text = chunk.toString();
    const words = text.split(/\s+/).filter(word => word.length > 0);
    this.wordCount += words.length;
    
    this.push(`Слов в этом chunk: ${words.length}\n`);
    callback();
  }

  _flush(callback) {
    this.push(`Всего слов: ${this.wordCount}\n`);
    callback();
  }
}

// Использование
const wordCounter = new WordCountTransform();

wordCounter.on('data', (chunk) => {
  console.log(chunk.toString());
});

wordCounter.write('Hello world from');
wordCounter.write('Node.js streams');
wordCounter.end();