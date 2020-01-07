// Tiene definidos los métodos de la API REST para comments
// Usa un router configurado en Express.

const express = require('express');
const routerComments = express.Router({ mergeParams: true });
const repository = require('../../repository');
const validator = require('../../validator/');
const ObjectID = require('mongodb').ObjectID;


routerComments.post('/', async (req, res) => {

    const postId = req.params.id;
    const comment = req.body;
    const { nickname, text } = comment;
    comment._id = new ObjectID();
    comment.date = new Date();

    //Validation
    if (typeof nickname != 'string' ||
        typeof text != 'string') {
        res.status(400).send('Invalid BODY');
    } else {
        const wordsToCheck = await repository.offensiveWordsCol.getAllOffensiveWords();
        const validation = await validator(text, wordsToCheck);
        if (validation.length === 0) {
            await repository.postsCol.addComment(comment, postId);
            res.json(comment);
        } else {
            res.status(400).json(validation);
        }
    }
});


routerComments.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const post = await repository.postsCol.findCommentById(id);
    const postId = post._id;  
    console.log(id,postId);
    const comment = await repository.postCol.findComment(id);
    console.log(comment);
    //Validation
    if (!post) {
        res.status(400).send('Comment not found');
    } else {
        await repository.postsCol.deleteCommentById(postId, id);
        res.json(post);
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
            await repository.postsCol.modifyCommentById(id, commentReq);
            res.json(commentReq);
        }
    }
});

module.exports = routerComments;

