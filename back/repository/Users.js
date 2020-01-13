
const ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcryptjs');

module.exports = class Users {
    constructor(conn) {
        this.conn = conn;
        this.collection = this.conn.db().collection('users');
    }

    async addUser(user) {        
        const { password, username, rol ='publisher' } = user;     
        const passwordHash = await bcrypt.hash(password, bcrypt.genSaltSync(8), null);
        const isUser = await this.collection.findOne({ username });
        if (!isUser) {
            const { nickname, username } = user;
            const newUser = {
                nickname,
                username,
                passwordHash,
                rol
            }
            this.collection.insertOne(newUser);
        } // si ya existe devolver que ya existe. //mejorar esta función enlazándola con el POST user
    }

    async verifyPassword(user, password) {
        return await bcrypt.compare(password, user.passwordHash);
    }

    getAllUsers() {
        return this.collection.find({}).toArray();
    }

    findUser(username) {
        return this.collection.findOne({ username });
    }

    loadAdminUsers(array) {
        array.forEach(async (user) => {
            await this.addUser(user)   
        });
    }

}

