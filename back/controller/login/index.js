const express = require('express');
const routerLogin = express.Router();
//const repository = require('../../repository');

const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require("jsonwebtoken");

const SECRET_KEY = "SECRET_KEY"

async function verify(username, password, done) {

    var user = await users.find(username);

    if (!user) {
        return done(null, false, { message: 'User not found' });
    }

    if (await users.verifyPassword(user, password)) {
        return done(null, user);
    } else {
        return done(null, false, { message: 'Incorrect password' });
    }
}

passport.use(new BasicStrategy(verify));

routerLogin.post('/',
    passport.authenticate('basic', { session: false }),
    (req, res) => {
        const { username } = req.user;
        const opts = { expiresIn: 300 }; //token expires in 2min
        const token = jwt.sign({ username }, SECRET_KEY, opts);

        return res.status(200).json({ message: "Auth Passed", token });

    });


    const jwtOpts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: SECRET_KEY
    }
    
    passport.use(new JwtStrategy(jwtOpts, async (payload, done) => {
    
        var user = await users.find(payload.username);
    
        if (user) {
            return done(null, user);
        } else {
            return done(null, false, { message: 'User not found' });
        }
    
    }));

module.exports = routerLogin;