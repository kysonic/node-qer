const buf1 = Buffer.alloc(10);          // Инициализированный нулями
const buf2 = Buffer.allocUnsafe(10);    // Неинициализированный (быстрее)
const buf3 = Buffer.from([1, 2, 3]);    // Из массива
const buf4 = Buffer.from('Hello');      // Из строки
const buf5 = Buffer.from(arrayBuffer);  // Из ArrayBuffer

// Работа с буферами
const buf = Buffer.alloc(5);

// Запись данных
buf.writeUInt8(65, 0);      // 'A' в позиции 0
buf.writeUInt16LE(16706, 1); // 'AB' в little-endian
buf.writeInt32BE(42, 3);    // Число 42 в big-endian

// Чтение данных
console.log(buf.readUInt8(0));        // 65
console.log(buf.readUInt16LE(1));     // 16706
console.log(buf.toString('hex'));     // 4142...

// Копирование и срезы
const bufCopy = Buffer.alloc(5);
buf.copy(bufCopy);
const slice = buf.subarray(1, 3);

// ArrayBuffer - сырая бинарная память
const buffer = new ArrayBuffer(16); // 16 байт
console.log(buffer.byteLength);     // 16

// TypedArray - представления над ArrayBuffer
const uint8 = new Uint8Array(buffer);
const uint32 = new Uint32Array(buffer);
const float64 = new Float64Array(buffer);

// Заполнение данными
uint8.set([1, 2, 3, 4, 5, 6, 7, 8]);
console.log(uint8); // Uint8Array(8) [1, 2, 3, 4, 5, 6, 7, 8]

// DataView - гибкое чтение/запись
const view = new DataView(buffer);
view.setInt32(0, 0x12345678, false); // big-endian
view.setFloat64(4, Math.PI, true);   // little-endian

console.log(view.getInt32(0, false).toString(16)); // 12345678
console.log(view.getFloat64(4, true)); // 3.141592653589793