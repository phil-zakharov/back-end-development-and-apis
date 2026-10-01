const fs = require('fs');

const readable = fs.createReadStream('assets/poem.txt', { encoding: 'utf8'})
const writable = fs.createWriteStream("assets/stream-output.txt");
readable.pipe(writable);
