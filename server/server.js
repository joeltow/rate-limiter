const express = require('express');

const idrequester = require('../identify-requester/identify-requester');

let app = express();

app.get('/', (req, res) => {
    let requesterId = idrequester.getRequesterId(req);
    console.log(`requesterId: ${requesterId}`);

    // log request
    // validate requester

    res.status(501).send({
        error: 'Not yet implemented.',
        name: 'rate-limiter'
    });
});

app.listen(3000);
console.log('listening on port 3000');

module.exports.app = app;