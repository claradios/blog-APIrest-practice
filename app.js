//Contiene el servidor Express.
//para generar archivo key y cert de https --> openssl req -nodes -new -x509 -keyout server.key -out server.cert
const cors = require('cors');
const express = require('express');
const PORT = process.env.PORT || 3443;
//módulos
const controller = require('./controller');
const repository = require('./repository/');
const defOffensiveWords = require('./defOffensiveWords.js');
// cifrado
const fs = require('fs');
const https = require('https');
// autenticación
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;

const app = express();

passport.use(new BasicStrategy(verify));
app.use(passport.initialize());
app.use(cors());
app.use(express.json());
app.use('/', controller);


function verify(name, password, done) {
    if (name == 'admin' && password == 'pass') {
    return done(null, { name, password });
    } else {
    return done(null, false, { message: 'Incorrect username or password' });
    }
    }

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
