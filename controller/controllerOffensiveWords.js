// Tendrá definidos los métodos de la API REST. Se usará un router que será configurado en Express.

const express = require('express');
const routerOffensiveWords = express.Router();
const repository = require('./repository/OffensiveWords.js');


routerOffensiveWords.post('/', async (req, res) => {
    // - POST Creación,*/offensivewords*
    const offensiveWord = req.body;
    console.log(offensiveWord);
    //Validation
    if (typeof offensiveWord.word != 'string' ||
        typeof offensiveWord.level != 'number'
    ) {
        res.sendStatus(400);
    } else {
        repository.addOffensiveWord(offensiveWord)
        res.json(offensiveWord);
    }
});

routerOffensiveWords.get('/', async (req, res) => {
    // - GET listado,*/offensivewords*
    const allWords = repository.getAllOffensiveWords();
    res.json(allWords);
});

routerOffensiveWords.get('/:id', async (req, res) => {
    // - GET listado,*/offensivewords*
    const id = req.params.id;
    const offensiveWord = repository.getOffensiveWordById(id)
    if (!offensiveWord) {
        res.sendStatus(404);
    } else {
        res.json(offensiveWord);
    }
});

routerOffensiveWords.delete('/:id', async (req, res) => {
    // - DELETE ONE borrado, */offensivewords/:id*
    const id = req.params.id;
    const offensiveWord = repository.getOffensiveWordById(id);
    if (!offensiveWord) {
        res.sendStatus(404);
    } else {
        repository.deleteOffensiveWordById(id);
        res.json(offensiveWord);
    }
});

routerOffensiveWords.put('/:id', async (req, res) => {
    // - PATCH or PUT modificación, */offensivewords/:id*
    const id = req.params.id;
    const offensiveWord = repository.getOffensiveWordById(id);
    if (!offensiveWord) {
        res.sendStatus(404);
    } else {
        const offensiveWordReq = req.body;
        //Validation
        if (typeof offensiveWordReq.word != 'string' ||
            typeof offensiveWordReq.level != 'number'
        ) {
            res.sendStatus(400);
        } else {
            //Create object with needed fields and assign id
            const newOffensiveWord = {
                word: postReq.author,
                level: postReq.number
            };
            //Update resource
            modifyOffensiveWordById(id, newOffensiveWord)
           
            //Return new resource         
            res.json(newOffensiveWord);
        }
    }
});

async function dbConnectWords() {
    const url = "mongodb://localhost:27017/postsDB";
    const conn = await MongoClient.connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    console.log("Connected to Mongo");    
}

module.exports = routerOffensiveWords;
exports.dbConnectWords = dbConnectWords;

//export default {routerOffensiveWords,dbConnectWords};