import fs from 'node:fs/promises';
import path from 'node:path';

try {
    const content = await fs.readFile(path.resolve('./test.txt'), 'utf-8');

    console.log(content);
} catch (e) {
    console.log(e);
}

await fs.writeFile('./abc.txt', 'Hello Guyz', 'utf-8');

await fs.unlink('./abc.txt');

console.log('<<<<<<<<<<');

const file = await fs.open(path.resolve('./test.txt'));

for await (const line of file.readLines()) {
  console.log(line);
}
