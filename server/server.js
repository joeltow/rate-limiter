const express = require('express');

const idrequester = require('../identify-requester/identify-requester');
const logRequest = require('../log-request/log-request');
const rateConfig = require('../rate-config/rate-config');

let app = express();

app.get('/', async (req, res) => {
    let curTime = new Date(Date.now()).toISOString();
    let requesterId = idrequester.getRequesterId(req);

    logRequest.logRequest(requesterId, curTime);
    let isRestricted = false;
    try {
        isRestricted = await rateConfig.isRestricted(requesterId);
    } catch (err) {
        next(err);
    }

    if (isRestricted){
        res.status(429).send({
            error: 'Thank you for your dedication to our platform, but you may have the wrong address. Perhaps you will have more success with freelancer.com?'
        })
    } else {
        res.send('Thanks for coming! Hope you found what you were looking for.');
    }
});

app.listen(3000);
console.log('listening on port 3000');

module.exports.app = app;