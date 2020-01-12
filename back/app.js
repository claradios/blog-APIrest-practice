'use strict';
const app = require('./server.js');
const PORT = process.env.PORT || 3443;
// cifrado
const fs = require('fs');
const https = require('https');
//repository
const repository = require('./repository/');
//default words file
const defOffensiveWords = require('./utils/defOffensiveWords.js');
//default users file
const defaultUsers = require('./utils/defaultUsers.js');

async function main() {
    await repository.dbConnect();

    const allWords = await repository.offensiveWordsCol.getAllOffensiveWords();
    const allUsers = await repository.usersCol.getAllUsers();
    
    if (allWords.length === 0) {
        await repository.offensiveWordsCol.insertDefaultWords(defOffensiveWords);
        console.log('Default offensive words list has been inserted.')
    }
    if (allUsers.length === 0) {
        await repository.usersCol. insertDefaultUsers(defaultUsers);
        console.log('Default users have been inserted')
    }

    https.createServer({
        key: fs.readFileSync('server.key'),
        cert: fs.readFileSync('server.cert')
    }, app).listen(PORT, () => {
        console.log(`Https server started in port ${PORT}`);
    });
}


main();
