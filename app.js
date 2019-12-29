//Tendrá el servidor Express.

const cors = require('cors');
const express = require('express');

const routerPosts = require('./controller/routerPosts');
const routerOffensiveWords = require('./controller/routerOffensiveWords');

const repository = require('./repository/');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/posts',routerPosts)
app.use('/offensivewords',routerOffensiveWords);

async function main() {     
    await repository.dbConnect();         
    app.listen(3000, () => console.log('Server Express started in port 3000'));
}

main();
