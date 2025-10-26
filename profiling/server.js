const http = require('http');
const crypto = require('crypto');

class MemoryLeakExample {
  constructor() {
    this.data = new Map();
    this.leaks = [];
  }

  processRequest(data) {
    const processed = this.heavyProcessing(data);
    this.leaks.push(processed);
    
    return processed.hash;
  }

  heavyProcessing(input) {
    const start = Date.now();
    let result = input;
    
    for (let i = 0; i < 1000; i++) {
      result = crypto.createHash('sha256').update(result).digest('hex');
    }
    
    return {
      hash: result,
      timestamp: Date.now(),
      processingTime: Date.now() - start
    };
  }

  cleanup() {
    this.leaks = this.leaks.slice(-1000);
  }
}

const leakExample = new MemoryLeakExample();

const server = http.createServer((req, res) => {
  const randomData = Math.random().toString(36);
  
  if (req.url === '/process') {
    const result = leakExample.processRequest(randomData);
    res.end(JSON.stringify({ hash: result, leaks: leakExample.leaks.length }));
  } else if (req.url === '/cleanup') {
    leakExample.cleanup();
    res.end('Cleanup completed');
  } else {
    res.end('OK');
  }
});

// Периодическая очистка (раз в минуту)
setInterval(() => {
  leakExample.cleanup();
}, 60000);

server.listen(3000, () => {
  console.log('Server running on port 3000');
  console.log('Start profiling with: node --inspect ./profiling/server.js');
});

// clinic doctor --on-port 'autocannon localhost:3000/process' -- node server.js
// clinic flame --on-port 'autocannon -d 20 localhost:3000' -- node server.js