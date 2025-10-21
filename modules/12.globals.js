// Abort Controller
const ac = new AbortController();

ac.signal.addEventListener('abort', () => console.log('Aborted!'), {
    once: true,
});

ac.abort();

console.log(ac.signal.aborted); // Prints true

// console.log(__dirname, __filename);

const base64 = atob('strinv');
const decoded = btoa(base64);

console.log(decoded);

const res = await fetch('https://nodejs.org/api/documentation.json');
if (res.ok) {
    const data = await res.json();
    console.log(data);
}

localStorage.setItem('ls', 'wtf');
