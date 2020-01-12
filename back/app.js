'use strict';
const app = require('./server.js');
const PORT = process.env.PORT || 3443;
// cifrado
const fs = require('fs');
const https = require('https');

const repository = require('./repository/');
//palabras por defecto
const defOffensiveWords = require('./defOffensiveWords.js');

async function main() {
    await repository.dbConnect();
    const allWords = await repository.offensiveWordsCol.getAllOffensiveWords();

    if (allWords.length === 0) {
        await repository.offensiveWordsCol.insertDefaultWords(defOffensiveWords);
        console.log('Default offensive words list has been inserted.')
    }

    https.createServer({
        key: fs.readFileSync('server.key'),
        cert: fs.readFileSync('server.cert')
    }, app).listen(PORT, () => {
        console.log(`Https server started in port ${PORT}`);
    });
}


main();
