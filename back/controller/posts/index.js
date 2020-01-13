// Tiene definidos los métodos de la API REST para Posts. 
// Usa un router configurado en Express.

const express = require('express');
const routerPosts = express.Router();
const repository = require('../../repository');
const passport = require('passport');

routerPosts.post('/',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const post = req.body;
        //Validation
        if (typeof post.author != 'string' ||
            typeof post.nickname != 'string' ||
            typeof post.title != 'string' ||
            typeof post.content != 'string'
        ) {
            res.status(400).send('invalid BODY');
        } else {
            await repository.postsCol.addPost(post)
            res.json(post);
        }
    });

routerPosts.get('/', async (req, res) => {
    const allPosts = await repository.postsCol.getAllPosts();
    res.json(allPosts);
});

routerPosts.get('/:postId', async (req, res) => {
    const id = req.params.postId;
    const post = await repository.postsCol.getPostById(id);
    if (!post) {
        res.sendStatus(404);
    } else {
        res.json(post);
    }
});

routerPosts.delete('/:postId',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const id = req.params.postId;
        const post = await repository.postsCol.getPostById(id);
        if (!post) {
            res.sendStatus(404);
        } else {
            await repository.postsCol.deletePostById(id);
            res.json(post);
        }
    });

routerPosts.put('/:postId',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const id = req.params.postId;
        const post = await repository.postsCol.getPostById(id);
        if (!post) {
            res.status(404).send('there is not such an element on the collection');
        } else {
            const postReq = req.body;
            //Validation
            if (typeof postReq.author != 'string' ||
                typeof postReq.nickname != 'string' ||
                typeof postReq.title != 'string' ||
                typeof postReq.content != 'string'
            ) {
                res.sendStatus(400);
            } else {
                await repository.postsCol.modifyPost(postReq, id);
                //Return new resource         
                res.json(postReq);
            }
        }
    });

module.exports = routerPosts;

