class Posts {
    constructor(conn) {
        this.conn = conn;
        this.collection = this.conn.db().collection('posts');
    }
    addPost() {
        //post
    }
    getAllPosts() {
        //get all post
    }
    getPostById() {
        //get one post
    }
    deletePostById() {
        //delete one post
    }
    deleteAllPost() {
        //delete all post
    }
}