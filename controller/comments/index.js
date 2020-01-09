// Tiene definidos los métodos de la API REST para comments
// Usa un router configurado en Express.

const express = require('express');
const routerComments = express.Router({ mergeParams: true });
const repository = require('../../repository');
const validator = require('../../validator/');
const ObjectID = require('mongodb').ObjectID;


routerComments.post('/', async (req, res) => {

    const postId = req.params.postId;
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


routerComments.delete('/:commentId', async (req, res) => {
    const postId = req.params.postId;
    const commentId = req.params.commentId;

    const comment = await repository.postsCol.findCommentById(commentId);
  
    

    //Validation
    if (comment.length === s0) {
        res.status(400).send('Comment not found');
    } else {
        await repository.postsCol.deleteCommentById(postId, commentId);
        res.json(comment);
    }
});

///posts/:postId/comments/:commentId
routerComments.put('/:commentId', async (req, res) => {
    const commentId = req.params.commentId;
    const postId = req.params.postId
   
    //FIND COMMENT TO EDIT

    const searchComment = await repository.postsCol.findSpecificComment(commentId);    
    const originalComment = searchComment[0].comments[0];   
    
    const { date } = originalComment;

    if (searchComment.length === 0) {
        res.status(400).send('the comment doesnt match any of the existents');
    } else {
        const commentReq = req.body;
        const { text, nickname } = commentReq;
        commentReq.date = date;
      
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
                await repository.postsCol.modifyCommentById(postId, commentId, commentReq);
                res.json(commentReq);
            } else {
                res.status(400).json(validation);
            }
        }
    }
});





module.exports = routerComments;

