
const ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcryptjs');

module.exports = class Users {
    constructor(conn) {
        this.conn = conn;
        this.collection = this.conn.db().collection('users');
    }

    async addUser(user) {
        const { password } = user;
        const passwordHash = await bcrypt.hash(password, bcrypt.genSaltSync(8), null);        
        const newUser = {
            nickname: user.nickname,
            password: passwordHash,
            name: user.name
        }
        console.log(newUser);
        this.collection.insertOne(newUser);
    }

    async verifyPassword (user, password) {
        return await bcrypt.compare(password, user.passwordHash);
    }

    getAllUsers() {
        return this.collection.find({ }).toArray();
    }

    getUserByName(name) {
        return this.collection.findOne({name: name });
    }}

//     deleteCommentById(id) {
//         return this.collection.deleteOne({ _id: new ObjectId(id) });
//     }

//     deleteAllComments(postId) {
//         return this.collection.deleteMany({ postId: postId });
//     }

//     modifyCommentById(id, commentReq) {

//         const newComment = {
//             nickname: commentReq.nickname,
//             text: commentReq.text,
//             date: commentReq.date
//         };

//         return this.collection.updateOne({ _id: new ObjectId(id) }, { $set: newComment });
//     }
// }