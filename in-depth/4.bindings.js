const native = require('./bindings/build/Release/sleep.node');

console.log('Start sleeping...');
native.sleep(2);
console.log('Woke up!');