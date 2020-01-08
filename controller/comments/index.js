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
   
    const comment = await repository.postsCol.findCommentById(id);
    
    const url = req.baseUrl;
    const urlToArr = url.split('/');
    const postId = urlToArr[2];

    //Validation
    if (comment.length === s0) {
        res.status(400).send('Comment not found');
    } else {
        await repository.postsCol.deleteCommentById(postId, id);
        res.json(comment);
    }
});


routerComments.put('/:id', async (req, res) => {
    const id = req.params.id;

    const url = req.baseUrl;
    const urlToArr = url.split('/');
    const postId = urlToArr[2];

    //FIND COMMENT TO EDIT
    
    const searchComment = await repository.postsCol.findSpecificComment(id);
    const commentToArray = searchComment[0].comments;
    const finalComment = commentToArray[0];
    console.log(finalComment);  
  
    if (searchComment.length === 0) {
        res.status(400).send('the comment doesnt match any of the existents');       
    } else {
        const commentReq = req.body;
        const { text, nickname } = commentReq;
        //commentReq._id = id;
        //BODY VALIDATION
        if (typeof nickname != 'string' ||
            typeof text != 'string') {
            res.status(400).send('invalid BODY');
        } else {
            //WORDS VALIDATION
            const wordsToCheck = await repository.offensiveWordsCol.getAllOffensiveWords();
            const validation = await validator(text, wordsToCheck);
            if (validation.length === 0) {
                //UPDATE RESOURCE 
                await repository.postsCol.modifyCommentById(postId, id, commentReq);
                res.json(commentReq);
            } else {
                res.status(400).json(validation);
            }
        }
    }
});





module.exports = routerComments;

