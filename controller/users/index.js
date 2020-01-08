const express = require('express');
const routerUsers = express.Router();
const repository = require('../../repository');

routerUsers.post('/', async (req, res) => {
    const user = req.body;
    const { nickname, password, name } = user;
    //const allUsers = await repository.usersCol.getAllUsers();
    //Validation
    if (
        typeof nickname != 'string' ||
        typeof password != 'string' ||
        typeof name != 'string'
    ) {
        res.status(400).send('invalid BODY');
    } 
    // else if (repository.usersCol.isAlreadyIncluded(user, allUsers)) {
    //     res.status(400).send('User is already included.')
    // } 
    else {
        await repository.usersCol.addUser(user);
        res.json(user);
    }
});

// routerOffensiveWords.get('/', async (req, res) => {
//     const allWords = await repository.offensiveWordsCol.getAllOffensiveWords();
//     res.json(allWords);
// });

module.exports = routerUsers;