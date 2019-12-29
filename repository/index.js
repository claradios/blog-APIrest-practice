//Módulo que contendrá el código de acceso a la base de datos.
const MongoClient = require('mongodb').MongoClient;
const Posts = require('./Posts');
const OffensiveWords = require('./OffensiveWords');

const url = "mongodb://localhost:27017/postsDB";

module.exports = {
    async dbConnect() {
        const conn = await MongoClient.connect(url, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        this.postsCol = new Posts(conn);
        this.offensiveWordsCol = new OffensiveWords(conn);
        console.log("Connected to Mongo");
    }
};



