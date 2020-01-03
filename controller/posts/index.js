// Tiene definidos los métodos de la API REST para Posts. 
// Usa un router configurado en Express.

const express = require('express');
const routerPosts = express.Router();
const repository = require('../../repository');

routerPosts.post('/', async (req, res) => {

    const post = req.body;   
    post.comments = []; 
    //Validation
    if (typeof post.author != 'string' ||
        typeof post.nickname != 'string' ||
        typeof post.title != 'string' ||
        typeof post.content != 'string'
    ) {
        res.sendStatus(400);
        console.log('validation error');
    } else {
        //Create object with needed fields and assign id
        await repository.postsCol.addPost(post)
        res.json(post);
    }
});

routerPosts.get('/', async (req, res) => {
    const allPosts = await repository.postsCol.getAllPosts();
    res.json(allPosts);
});

routerPosts.get('/:id', async (req, res) => {
    const id = req.params.id;
    const post = await repository.postsCol.getPostById(id);   
    const allComments = await repository.commentsCol.getAllComments();
    post.comments = allComments;
    //console.log(allComments);
    if (!post) {
        res.sendStatus(404);
    } else {
        res.json(post);
    }
});

routerPosts.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const post = await repository.postsCol.getPostById(id);
    if (!post) {
        res.sendStatus(404);
    } else {
        await repository.postsCol.deletePostById(id);
        res.json(post);
    }
});
routerPosts.patch('/:id', async (req, res) => {
    //añadir un comentario
    // https://docs.mongodb.com/manual/reference/operator/update/push/
    // leer documentación
    console.log('hola');
    const id = req.params.id;    
    const comment = req.body;
    if(!comment) {
        res.sendStatus(404);
    } else {
        await repository.postCol.addCommentArr(id,comment);
    }    
});

routerPosts.put('/:id', async (req, res) => {
    const id = req.params.id;
    const post = await repository.postsCol.getPostById(id);
    console.log(id);
    console.log(post);
    if (!post) {
        res.sendStatus(404);
        console.log('there is not such an element on the collection');
    } else {
        const postReq = req.body;
        console.log(postReq);
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

