//Tendrá el servidor Express.

const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
const express = require('express');
const url = "mongodb://localhost:27017/itemsDB";


//api blog de referencia, mi key: 832800956c174df093b590ed7005de11
//Generate unique id for resources
//const uuid = require('uuid/v4');

const app = express();

//Convert json bodies to JavaScript object
app.use(express.json());

//Save info in memory 
//const items = new Map();

let conn;
let articles;

app.post('/articles', async (req, res) => {
    const article = req.body;
    //Validation
    console.log(article);
    if (typeof article.author != 'string' ||
        typeof article.title != 'string' ||
        typeof article.url != 'string' ||
        typeof article.urlToImage != 'string' ||
        typeof article.time != 'string' ||
        typeof article.content != 'string'
        ) {
        res.sendStatus(400);
    } else {
        //Create object with needed fields and assign id
        const newArticle = {            
            author: article.author,
            title: article.title,
            url: article.url,
            urlToImage: article.urlToImage,
            time: article.time,
            content: article.content
        };
        await items.insertOne(newArticle);
        res.json(newArticle);
    }
});


