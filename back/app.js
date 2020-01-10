// servidor Express.
const cors = require('cors');
const express = require('express');
const PORT = process.env.PORT || 3443;

//módulos
const controller = require('./controller');
const repository = require('./repository/');
const defOffensiveWords = require('./defOffensiveWords.js');

// cifrado
const fs = require('fs');
const https = require('https');

// autenticación - passport
//para generar archivo key y cert de https --> openssl req -nodes -new -x509 -keyout server.key -out server.cert
const passport = require('passport');
const BasicStrategy = require('passport-http').BasicStrategy;

// autenticación - jwt
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require("jsonwebtoken");
const SECRET_KEY = "SECRET_KEY";

const app = express();


app.use(passport.initialize());
app.use(cors());
app.use(express.json());
app.use('/', controller);


async function verify(username, password, done) {

    const user = await repository.usersCol.findUser(username);

    if (!user) {
        return done(null, false, { message: 'User not found' });
    }

    if (await repository.usersCol.verifyPassword(user, password)) {
        return done(null, user);
    } else {
        return done(null, false, { message: 'Incorrect password' });
    }
}

passport.use(new BasicStrategy(verify));

app.post("/login",
    passport.authenticate('basic', { session: false }),
    (req, res) => {

        const { username } = req.user;

        const opts = { expiresIn: 120 }; //token expires in 2min
        const token = jwt.sign({ username }, SECRET_KEY, opts);

        return res.status(200).json({ message: "Auth Passed", token });

    });

const jwtOpts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET_KEY
}

passport.use(new JwtStrategy(jwtOpts, async (payload, done) => {
    const user = await repository.usersCol.findUser(payload.username);
    if (user) {
        return done(null, user);
    } else {
        return done(null, false, { message: 'User not found' });
    }
}));

async function main() {
    await repository.dbConnect();
    const allWords = await repository.offensiveWordsCol.getAllOffensiveWords();

    if (allWords.length === 0) {
        await repository.offensiveWordsCol.insertDefaultWords(defOffensiveWords);
        console.log('Default offensive words list has been inserted.')
    }

    https.createServer({
        key: fs.readFileSync('server.key'),
        cert: fs.readFileSync('server.cert')
    }, app).listen(PORT, () => {
        console.log(`Https server started in port ${PORT}`);
    });
}


main();
