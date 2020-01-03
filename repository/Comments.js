
const ObjectId = require('mongodb').ObjectId;

module.exports = class Comments {
    constructor(conn) {
        this.conn = conn;
        this.collection = this.conn.db().collection('comments');
    }

    addComment(comment) {
        const newComment = {
            nickname: comment.nickname,
            text: comment.text,
            date: comment.date
        }    
        this.collection.insertOne(newComment);          
    }

    getAllComments() {
        return this.collection.find({}).toArray();
    }

    getCommentById(id) {
        return this.collection.findOne({ _id: new ObjectId(id) });
    }

    deleteCommentById(id) {
        return this.collection.deleteOne({ _id: new ObjectId(id) });
    }

    modifyCommentById(id, commentReq) {

        const newComment = {
            nickname: commentReq.nickname,
            text: commentReq.text,
            date: commentReq.date
          };    

        return this.collection.updateOne({ _id: new ObjectId(id) }, { $set: newComment });
    }
}