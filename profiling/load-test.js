const http = require('http');

async function runLoadTest() {
  console.log('Starting load test...');
  
  for (let i = 0; i < 10000; i++) {
    await new Promise((resolve) => {
      http.get('http://localhost:3000/process', (res) => {
        let data = '';
        res.on('data', chunk => data += chunk);
        res.on('end', () => {
          if (i % 1000 === 0) {
            console.log(`Request ${i}: ${data}`);
          }
          resolve();
        });
      });
    });
    
    // Добавляем небольшую задержку
    if (i % 100 === 0) {
      await new Promise(resolve => setTimeout(resolve, 10));
    }
  }
  
  console.log('Load test completed');
}

runLoadTest().catch(console.error);