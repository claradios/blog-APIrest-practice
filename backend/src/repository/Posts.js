const ObjectId = require('mongodb').ObjectId;
module.exports = class Posts {
    constructor(conn) {
        this.conn = conn;
        this.collection = this.conn.db().collection('posts');
    }
    addPost(post, user) {
        const { username, nickname } = user;
        const { title, content, urlToImage } = post;
        const newPost = {
            author: username,
            nickname,
            title,
            content,
            urlToImage
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

    modifyPost(user, postReq, id) {
        const { username, nickname } = user;
        const { title, content, urlToImage } = postReq;
        const newPost = {
            author:username,
            nickname,
            title,
            content,
            urlToImage
        };
        //UPDATE RESOURCE      
        return this.collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: newPost }
        );
    }

    addComment(comment, postId) {
        const { nickname, text, date, _id } = comment;
        const newComment = {
            nickname,
            text,
            date,
            _id
        }

        this.collection.updateOne(
            { _id: ObjectId(postId) },
            { $push: { comments: newComment } }
        );
    }

    findCommentById(id) {
        return this.collection.find(
            { comments: { $elemMatch: { _id: ObjectId(id) } } }
        ).toArray();
    }

    findSpecificComment(id) {        
        return this.collection.aggregate([
            { "$match": { 'comments._id': ObjectId(id) } },
            {
                "$project": {
                    "comments": {
                        "$filter": {
                            "input": '$comments',
                            "as": 'comments',
                            "cond": { "$eq": ['$$comments._id', ObjectId(id)] }
                        }
                    },
                    _id: 0
                }
            }
        ]).toArray();
    }

    deleteCommentById(postId, id) {
        return this.collection.updateOne(
            { "_id": ObjectId(postId) },
            { "$pull": { "comments": { "_id": ObjectId(id) } } }
        );
    }

    modifyCommentById(postId, id, commentReq) {
        const { nickname, text, date } = commentReq;
        const newComment = {
            nickname,
            text,
            date,
            _id: ObjectId(id),
            edited: `${new Date()} (last edited)`
        };
        // https://blog.fullstacktraining.com/retrieve-only-queried-element-in-an-object-array-in-mongodb-collection/
        return this.collection.updateOne(
            { _id: ObjectId(postId), "comments._id": ObjectId(id) },
            { $set: { "comments.$": newComment } }
        );
    }

}