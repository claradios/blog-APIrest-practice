// Tiene definidos los métodos de la API REST para comments
// Usa un router configurado en Express.

const express = require('express');
const routerComments = express.Router();
const repository = require('../../repository');
const validator = require('../../validator/');

routerComments.post('/', async (req, res) => {
    const comment = req.body;
    const { nickname, text, date } = comment;
    //Validation
    if (typeof nickname != 'string' ||
        typeof text != 'string') {
        const bodyErr = 'Incorrect BODY';
        res.status(400).send(bodyErr);
    } else {
        const wordsToCheck = await repository.offensiveWordsCol.getAllOffensiveWords();
        const validation = await validator(text, wordsToCheck);
        if (validation.length === 0) {
            await repository.commentsCol.addComment(comment);
            res.json(comment);
        } else {
            let warningMsg = '';
            validation.forEach(offensiveWord => {
                const { word, level } = offensiveWord;
                warningMsg += `The word ${word} is forbidden. It is catalogued as level ${level}.`;
            });
            res.status(400).send(warningMsg);
        }
    }
});

routerComments.get('/', async (req, res) => {
    // Validation
    const allComments = await repository.commentsCol.getAllComments();
    res.json(allComments);

});

routerComments.get('/:id', async (req, res) => {
    const id = req.params.id;
    const comment = await repository.commentsCol.getCommentById(id);
    //validation
    if (!comment) {
        res.sendStatus(400).send('that comment doesnt match any of the existents');
    } else {
        res.json(comment);
    }
});

routerComments.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const comment = await repository.commentsCol.getCommentById(id);
    //Validation
    if (!comment) {
        res.sendStatus(400);
        console.log('that comment doesnt match any of the existents');
    } else {
        await repository.commentsCol.deleteCommentById(id);
        res.json(comment);
    }
});

routerComments.put('/:id', async (req, res) => {
    const id = req.params.id;
    const comment = await repository.commentsCol.getCommentById(id);
    //EXISTENCE Validation
    if (!comment) {
        res.sendStatus(400);
        console.log('the comment doesnt match any of the existents');
    } else {
        const commentReq = req.body;
        //BODY Validation
        if (typeof commentReq.nickname != 'string' ||
            typeof commentReq.text != 'string') {
            res.sendStatus(400);
            console.log('the comment BODY doesnt match criteria');
        } else {
            //UPDATE RESOURCE
            await repository.commentsCol.modifyCommentById(id, commentReq);
            res.json(commentReq);
        }
    }
});

module.exports = routerComments;

