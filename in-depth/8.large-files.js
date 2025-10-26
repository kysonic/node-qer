const { Transform, pipeline } = require('stream');
const fs = require('fs');
const csv = require('csv-parser');

class CSVProcessor extends Transform {
  constructor(options = {}) {
    super({ ...options, objectMode: true });
    this.processedRows = 0;
    this.startTime = Date.now();
  }

  _transform(row, encoding, callback) {
    this.processedRows++;
    
    process.nextTick(() => {
      try {
        const processedRow = {
          id: this.processedRows,
          name: row.name ? row.name.toUpperCase() : 'UNKNOWN',
          email: row.email || 'no-email',
          timestamp: new Date().toISOString(),
          originalData: row
        };
        
        if (this.shouldProcessRow(processedRow)) {
          this.push(JSON.stringify(processedRow) + '\n');
        }
        
        if (this.processedRows % 1000 === 0) {
          const elapsed = Date.now() - this.startTime;
          console.log(`Обработано ${this.processedRows} строк за ${elapsed}ms`);
        }
        
        callback();
      } catch (error) {
        callback(error);
      }
    });
  }

  shouldProcessRow(row) {
    // Фильтрация данных
    return row.email !== 'no-email' && row.name !== 'UNKNOWN';
  }

  _flush(callback) {
    const totalTime = Date.now() - this.startTime;
    console.log(`\n=== ОБРАБОТКА ЗАВЕРШЕНА ===`);
    console.log(`Всего обработано строк: ${this.processedRows}`);
    console.log(`Общее время: ${totalTime}ms`);
    console.log(`Скорость: ${(this.processedRows / (totalTime / 1000)).toFixed(2)} строк/сек`);
    callback();
  }
}

function processLargeCSV(inputFile, outputFile) {
  console.log(`Начата обработка файла: ${inputFile}`);
  
  const readStream = fs.createReadStream(inputFile);
  const writeStream = fs.createWriteStream(outputFile);
  const csvParser = require('csv-parser')();
  const processor = new CSVProcessor();

  pipeline(
    readStream,
    csvParser,
    processor,
    writeStream,
    (error) => {
      if (error) {
        console.error('Ошибка обработки CSV:', error);
      } else {
        console.log(`Обработанный файл сохранен как: ${outputFile}`);
      }
    }
  );
}

// Эмуляция работы с большим файлом
// processLargeCSV('./large-data.csv', './processed-data.jsonl');