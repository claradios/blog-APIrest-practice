'use strict';

const express = require('express');
const routerLogin = express.Router();

const passport = require('passport');
const jwt = require("jsonwebtoken");
const SECRET_KEY = "SECRET_KEY";

// ### Crear entradas del blog.
// No haría falta comprobarlo, pues si tiene token ya es o admin o publisher.
// user.rol === 'admin' || user.rol === 'publisher'
// ### Borrar y modificar únicamente las entradas que hayan creado ellos.
// Hace falta comprobar si es 
// user.rol === 'admin' || user.rol === 'publisher' && post.author === user.username

routerLogin.post('/',
    passport.authenticate('basic', { session: false }),
    (req, res) => {
        
        const { username } = req.user;

        const opts = { expiresIn: 120 }; //token expires in 2min
        const token = jwt.sign({ username }, SECRET_KEY, opts);

        return res.status(200).json({ message: "Auth Passed", token });

    });

module.exports = routerLogin;