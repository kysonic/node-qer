import querystring from 'node:querystring';

function gbkEncodeURIComponent(str) {
  // Convert string to GBK encoded buffer
  const gbkBuffer = iconv.encode(str, 'GBK');
  
  // URL-encode each byte
  let result = '';
  for (let i = 0; i < gbkBuffer.length; i++) {
    const byte = gbkBuffer[i];
    if (byte > 0x7F || byte === 0x20 || byte === 0x26 || byte === 0x2B) {
      // Encode non-ASCII, space, &, + as %XX
      result += '%' + byte.toString(16).toUpperCase();
    } else {
      // Keep ASCII characters (except special ones) as-is
      result += String.fromCharCode(byte);
    }
  }
  return result;
}

const s = querystring.parse('w=%D6%D0%CE%C4&foo=bar', null, null,
                  { decodeURIComponent: gbkEncodeURIComponent }); 

console.log(s);