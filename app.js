//Contiene el servidor Express.

const cors = require('cors');
const express = require('express');
const PORT = process.env.PORT || 3000;
const controller = require('./controller');
const repository = require('./repository/');
const defOffensiveWords = require('./defOffensiveWords.js');
const fs = require('fs');
const https = require('https');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/', controller);

async function main() {
    await repository.dbConnect();
    const allWords = await repository.offensiveWordsCol.getAllOffensiveWords();

    if (allWords.length === 0) {
        await repository.offensiveWordsCol.insertDefaultWords(defOffensiveWords);
        console.log('Default offensive words list has been inserted.')
    }

    // app.listen(PORT, () => console.log(`Server Express started in port ${PORT}`));
    https.createServer({
        key: fs.readFileSync('server.key'),
        cert: fs.readFileSync('server.cert')
    }, app).listen(3443, () => {
        console.log("Https server started in port 3443");
    });
}

//openssl req -nodes -new -x509 -keyout server.key -out server.cert


main();
