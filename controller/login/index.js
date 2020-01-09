const express = require('express');
const routerLogin = express.Router();
const repository = require('../../repository');

routerLogin.get('/', async (req, res) => {
    const allWords = await repository.offensiveWordsCol.getAllOffensiveWords();
    res.json(allWords);
});

module.exports = routerLogin;