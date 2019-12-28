//Tendrá el servidor Express.

const cors = require('cors');
const express = require('express');

const routerPosts = require('./controller/controllerPosts');
const routerOffensiveWords = require('./controller/controllerOffensiveWords');
const dbConnectPosts = require('./controller/controllerPosts');
const dbConnectWords = require('./controller/controllerOffensiveWords');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/posts',routerPosts);
app.use('/offensivewords',routerOffensiveWords);

async function main() {    
    await dbConnectWords();    
    await dbConnectPosts();
    app.listen(3000, () => console.log('Server started in port 3000'));
}

main();
