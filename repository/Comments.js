
const ObjectId = require('mongodb').ObjectId;

module.exports = class Comments {
    constructor(conn) {
        this.conn = conn;
        this.collection = this.conn.db().collection('comments');
    }
    addComment(comment, postId) {
        // - Adición de un nuevo comentario a una entrada
        // *'/post/:id/comments/'*
    }
    deleteComment(commentId) {
        // - Borrado de un comentario existente en una entrada
        // *'/post/:id/comments/:id'*
    }
    modifyComment(newComment, commentId, postId) {
        // - Modificación de un comentario existente
        // *'/post/:id/comments/:id'*
    }
}