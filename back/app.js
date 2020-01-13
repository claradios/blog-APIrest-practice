'use strict';
const app = require('./server.js');
const PORT = process.env.PORT || 3443;
// cifrado
const fs = require('fs');
const https = require('https');
// repository

https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
}, app).listen(PORT, () => {
    console.log(`Https server started in port ${PORT}`);
});







