// Демонстрация приоритетов
console.log('1. Синхронный');

process.nextTick(() => console.log('2. nextTick'));

Promise.resolve().then(() => console.log('3. Promise'));

setTimeout(() => {
    console.log('4. setTimeout');
    queueMicrotask(() => console.log('5. Микротаска в таймере'));
    Promise.resolve().then(() => console.log('6. Promise'));
}, 0);

setImmediate(() => {
    console.log('7. setImmediate');
});

console.log('8. Синхронный конец');

// 1. Синхронный
// 8. Синхронный конец
// 2. nextTick
// 3. Promise
// 7. setImmediate
// 4. setTimeout
// 5. Микротаска в таймере
// 6. Promise