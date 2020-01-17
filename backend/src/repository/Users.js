
const ObjectId = require('mongodb').ObjectId;
const bcrypt = require('bcryptjs');

module.exports = class Users {
    constructor(conn) {
        this.conn = conn;
        this.collection = this.conn.db().collection('users');
    }

    async addUser(user) {
        const { nickname, password, username, rol = 'publisher' } = user;
        const passwordHash = await bcrypt.hash(password, bcrypt.genSaltSync(8), null);

            const newUser = {
                nickname,
                username,
                passwordHash,
                rol
            }
            this.collection.insertOne(newUser);       
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
    // PARA ELIMINAR USUARIOS
    // async deleteUser(user,password) {
    //    const comparison = await bcrypt.compare(password, user,passwordHash);
    //     if (comparison) {
    //         return this.collection.deleteOne({username});
    //     }
    // }

    loadAdminUsers(array) {
        array.forEach(async (user) => {
            await this.addUser(user)
        });
    } 
    closeIt() {
        this.collection.close();
      }

}

