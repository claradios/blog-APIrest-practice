// Tendrá definidos los métodos de la API REST. Se usará un router que será configurado en Express.

const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const routerPosts = express.Router();
const repository = require('../repository/Posts.js')

routerPosts.post('/', async (req, res) => {

    const post = req.body;  
    //Validation
    if (typeof post.author != 'string' ||
        typeof post.nickname != 'string' ||
        typeof post.title != 'string' ||
        typeof post.content != 'string' ||
        typeof post.date != 'string'
    ) {
        res.sendStatus(400);
        console.log('he fallado');
    } else {
        //Create object with needed fields and assign id
        repository.addPost(post)
        res.json(post);
    }
});

routerPosts.get('/', async (req, res) => {
    const allPosts = repository.getAllPosts();
    res.json(allPosts);
});

routerPosts.get('/:id', async (req, res) => {
    const id = req.params.id;
    const post = getPostById(id);
    if (!post) {
        res.sendStatus(404);
    } else {
        res.json(post);
    }
});

routerPosts.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const post = getPostById(id);
    if (!post) {
        res.sendStatus(404);
    } else {
        deletePostById(id);
        res.json(post);
    }
});

routerPosts.put('/:id', async (req, res) => {
    const id = req.params.id;
    const post = await posts.findOne({ _id: new ObjectId(id) });
    if (!post) {
        res.sendStatus(404);
    } else {
        const postReq = req.body;
        //Validation
        if (typeof postReq.author != 'string' ||
            typeof postReq.nickname != 'string' ||
            typeof postReq.title != 'string' ||
            typeof postReq.content != 'string' ||
            typeof postReq.date != 'string') {
            res.sendStatus(400);
        } else {
            modifyPost(postReq,id);
            //Return new resource         
            res.json(postReq);
        }
    }
});

 
async function dbConnectPosts() {
    const url = "mongodb://localhost:27017/postsDB";
    const conn = await MongoClient.connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });;
    console.log("Connected to Mongo"); 
    posts = conn.db().collection('posts');
    //offensiveWords = conn.db().collection('offensivewords');
}

module.exports = routerPosts;
exports.dbConnectPosts = dbConnectPosts;
//export default {routerPosts, dbConnectPosts};