// Tiene definidos los métodos de la API REST para offensive words. 
// Usa un router configurado en Express.

const express = require('express');
const routerOffensiveWords = express.Router();
const repository = require('../../repository');

routerOffensiveWords.post('/', async (req, res) => {
    const offensiveWord = req.body;
    const { word, level } = offensiveWord;
    const allWords = await repository.offensiveWordsCol.getAllOffensiveWords();
    //Validation
    if (
        typeof word != 'string' ||
        typeof level != 'number' ||
        level < 0 || level >= 5
    ) {
        res.status(400).send('invalid BODY');
    } else if (repository.offensiveWordsCol.isAlreadyIncluded(offensiveWord, allWords)) {
        res.status(400).send('Offensive Word is already included.')
    } else {
        await repository.offensiveWordsCol.addOffensiveWord(offensiveWord);
        res.json(offensiveWord);
    }
});

routerOffensiveWords.get('/', async (req, res) => {
    const allWords = await repository.offensiveWordsCol.getAllOffensiveWords();
    res.json(allWords);
});

routerOffensiveWords.get('/:id', async (req, res) => {
    const id = req.params.id;
    const offensiveWord = await repository.offensiveWordsCol.getOffensiveWordById(id)
    if (!offensiveWord) {
        res.status(404).send('Word not found');
    } else {
        res.json(offensiveWord);
    }
});

routerOffensiveWords.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const offensiveWord = await repository.offensiveWordsCol.getOffensiveWordById(id);
    if (!offensiveWord) {
        res.status(404).send('Word not found');
    } else {
        await repository.offensiveWordsCol.deleteOffensiveWordById(id);
        res.json(offensiveWord);
    }
});

routerOffensiveWords.put('/:id', async (req, res) => {
    const id = req.params.id;
    const offensiveWord = await repository.offensiveWordsCol.getOffensiveWordById(id);
    if (!offensiveWord) {
        res.status(404).send('Word not found.');
    } else {
        const offensiveWordReq = req.body;
        //Validation
        if (
            typeof offensiveWordReq.word != 'string' ||
            typeof offensiveWordReq.level != 'number'
        ) {
            res.status(400).send('invalid BODY');
        } else {
            //Update resource
            await repository.offensiveWordsCol.modifyOffensiveWordById(id, offensiveWordReq);
            //Return new resource         
            res.json(offensiveWordReq);
        }
    }
});

module.exports = routerOffensiveWords;
