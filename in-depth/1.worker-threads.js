const { Worker, isMainThread, parentPort } = require('worker_threads');

if (isMainThread) {
  // Основной поток
  const worker = new Worker(__filename);
  worker.on('message', (result) => console.log('Результат:', result));
  worker.postMessage(40); // Запуск вычисления для n=40
  console.log(`I'm not blocked!`);
} else {
  // Worker
  parentPort.on('message', (n) => {
    const result = fibonacci(n);
    parentPort.postMessage(result);
  });

  function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
  }
}