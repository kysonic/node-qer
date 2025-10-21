const hasICU = typeof Intl === 'object';

console.log(hasICU);

console.log(9e8);

const january = new Date(9e8);
const english = new Intl.DateTimeFormat('en', { month: 'long' });
const spanish = new Intl.DateTimeFormat('es', { month: 'long' });

console.log(english.format(january));
console.log(spanish.format(january));
