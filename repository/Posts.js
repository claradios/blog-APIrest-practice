const ObjectId = require('mongodb').ObjectId;
module.exports = class Posts {
    constructor(conn) {
        this.conn = conn;
        this.collection = this.conn.db().collection('posts');
    }
    addPost(post) {
        const newPost = {
            author: post.author,
            nickname: post.nickname,
            title: post.title,
            content: post.content,
            urlToImage: post.urlToImage
        };
        return this.collection.insertOne(newPost);
    }

    getAllPosts() {
        return this.collection.find({}).project({ comments: 0 }).toArray();
    }

    getPostById(id) {
        return this.collection.findOne({ _id: new ObjectId(id) });
    }

    deletePostById(id) {
        return this.collection.deleteOne({ _id: new ObjectId(id) });
    }

    modifyPost(postReq, id) {
        //Create object with needed fields and assign id
        const newPost = {
            author: postReq.author,
            nickname: postReq.nickname,
            title: postReq.title,
            content: postReq.content,
            urlToImage: postReq.urlToImage
        };
        //Update resource      
        return this.collection.updateOne({ _id: new ObjectId(id) }, { $set: newPost });
    }

    // addCommentArr(id, comment) {
    //     return this.collection.updateOne({ _id: ObjectId(id) }, { $set: { comments: [comment] } }, { upsert: true });
    // }

    addComment(comment, postId) {
        const newComment = {
            nickname: comment.nickname,
            text: comment.text,
            date: comment.date,
            _id: comment._id,
        }

        this.collection.updateOne(
            { _id: ObjectId(postId) },
            { $push: { comments: newComment } }
        );
    }

    findCommentById(id) {
        // return this.collection.findOne({ _id: new ObjectId(id) });
        return this.collection.find(
            { comments: { $elemMatch: { _id: ObjectId(id) } } }
        ).toArray();

    }

    deleteCommentById(postId, id) {
        return this.collection.updateOne(
            { "_id": ObjectId(postId) },
            { "$pull": { "comments": { "_id": ObjectId(id) } } }
        );
    }

    modifyCommentById(postId, id, commentReq) {
        const newComment = {
            nickname: commentReq.nickname,
            text: commentReq.text,
            date: `${new Date()} (last edited)`,
            _id: id,
        };
       // https://blog.fullstacktraining.com/retrieve-only-queried-element-in-an-object-array-in-mongodb-collection/
        return this.collection.updateOne(
            { _id: ObjectId(postId), "comments._id": ObjectId(id) },
            { $set: { "comments.$": newComment } }
        );
    }
}