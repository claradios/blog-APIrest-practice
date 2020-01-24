const express = require('express');
const routerUsers = express.Router();
const repository = require('../../repository');
const passport = require('passport');

routerUsers.post('/signup', async (req, res) => {
    const user = req.body;
    const { nickname, password, username, userImage } = user;
    const isUser = await repository.usersCol.findUser(username);
    //Validation
    if (
        typeof nickname != 'string' ||
        typeof password != 'string' ||
        typeof username != 'string' ||
        typeof userImage != 'string'
    ) {
        res.status(400).send('invalid BODY');
    } else if (isUser) {
        res.status(400).send('username is taken')
    } else {
        await repository.usersCol.addUser(user);
        res.json(user);
    }
});

routerUsers.get('/users',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const { rol } = req.user;
        if (rol !== 'admin') {
            res.status(401).send('unauthorize');
        } else {
            const allUsers = await repository.usersCol.getAllUsers();
            res.json(allUsers);
        }
    });

routerUsers.get('/myuser',
    passport.authenticate('jwt', { session: false }),
    async (req, res) => {
        const { rol, username } = req.user;
        if (rol !== 'admin') {
            res.status(401).send('unauthorize');
        } else {
            const allUsers = await repository.usersCol.findUser(username);
            res.json(allUsers);
        }
    });

// routerUsers.get('/usersone',
//     passport.authenticate('jwt', { session: false })),
//     async (req, res) => {
//         console.log('hola')
//         const { username } = req.user;
//         console.log(username)
//         const userFound = await repository.usersCol.findUser(username);
//         console.log(userFound)
//         res.json(userFound)
//     }

module.exports = routerUsers;