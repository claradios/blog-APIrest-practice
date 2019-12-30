// Tiene definidos los métodos de la API REST para comments
// Usa un router configurado en Express

const express = require('express');
const routerComments = express.Router();
const repository = require('../../repository');

routerComments.post('/', async (req, res) => {
    const comment = req.body;
    //Validation
    if (typeof comment.nickname != 'string' ||
        typeof comment.text != 'string') {
        console.log('petition BODY is not correct');
        res.sendStatus(400);
    } else {
        await repository.commentsCol.addComment(comment);
        res.json(comment);
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
        res.sendStatus(400);
        console.log('that comment doesnt match any of the existents');
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

