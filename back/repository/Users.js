
const ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcryptjs');

module.exports = class Users {
    constructor(conn) {
        this.conn = conn;
        this.collection = this.conn.db().collection('users');
    }

    async addUser(user) {
        const { password, username } = user;
        const passwordHash = await bcrypt.hash(password, bcrypt.genSaltSync(8), null);
        const isUser = await this.collection.findOne({ username });
        if (!isUser) {
            const { nickname, username } = user;
            const newUser = {
                nickname,
                username,
                passwordHash
            }
            this.collection.insertOne(newUser);
        } // si ya existe devolver que ya existe. //mejorar esta función enlazándola con el POST user
    }

    async verifyPassword(user, password) {
        console.log(user, password);
        return await bcrypt.compare(password, user.passwordHash);
    }

    getAllUsers() {
        return this.collection.find({}).toArray();
    }

    findUser(username) {
        return this.collection.findOne({ username });
    }

    insertDefaultUsers(array) {
        array.forEach(async (user) => {
            const { username, passwordHash, nickname } = user;
            if (typeof username != 'string' || typeof passwordHash != 'string' || typeof nickname != 'string') {
                console.log('there is a problem with the default users insertion');
            } else {
                this.collection.insertOne(user);
            }
        });
    }

}

