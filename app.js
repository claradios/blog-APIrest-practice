//Tendrá el servidor Express.

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const express = require('express');
const url = "mongodb://localhost:27017/postsDB";


//api blog de referencia, mi key: 832800956c174df093b590ed7005de11
//Generate unique id for resources
//const uuid = require('uuid/v4');

const app = express();

//Convert json bodies to JavaScript object
app.use(express.json());


let conn;
let posts;

app.post('/posts', async (req, res) => {
    const post = req.body;
    //Validation
    console.log(post);
    if (typeof post.author != 'string' ||
        typeof post.nickname != 'string' ||
        typeof post.title != 'string' ||
        typeof post.content != 'string' ||
        typeof post.date != 'string'
    ) {
        res.sendStatus(400);
    } else {
        //Create object with needed fields and assign id
        const newPost = {
            author: post.author,
            nickname: post.nickname,
            title: post.title,
            content: post.content,
            date: post.date,
            urlToImage: post.urlToImage,
            comments: post.comments

        };
        await posts.insertOne(newPost);
        res.json(newPost);
    }
});
app.get('/posts', async (req, res) => {
    const allPosts = await posts.find({}).toArray();
    res.json(allPosts);
});

app.get('/posts/:id', async (req, res) => {
    const id = req.params.id;
    const post = await posts.findOne({ _id: new ObjectId(id) });
    if (!post) {
        res.sendStatus(404);
    } else {
        res.json(post);
    }
});


app.delete('/posts/:id', async (req, res) => {
    const id = req.params.id;
    const post = await posts.findOne({ _id: new ObjectId(id) });
    if (!post) {
        res.sendStatus(404);
    } else {
        await posts.deleteOne({ _id: new ObjectId(id) });
        res.json(post);
    }
});

app.put('/posts/:id', async (req, res) => {
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
            typeof postReq.date != 'string' ) {
            res.sendStatus(400);
        } else {
            //Create object with needed fields and assign id
            const newPost = {
                author: postReq.author,
                nickname: postReq.nickname,
                title: postReq.title,
                content: postReq.content,
                date: postReq.date,
                urlToImage: postReq.urlToImage,
                comments: postReq.comments    
            };
            //Update resource
            await posts.updateOne({ _id: new ObjectId(id) }, { $set: newPost });
            //Return new resource         
            res.json(newPost);
        }
    }
});

async function dbConnect() {

    conn = await MongoClient.connect(url, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });

    console.log("Connected to Mongo");

    posts = conn.db().collection('posts');
}

async function main() {

    await dbConnect();

    app.listen(3000, () => console.log('Server started in port 3000'));
}

main();
