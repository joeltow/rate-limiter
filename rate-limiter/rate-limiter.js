const db = require('./db/db');
const idRequester = require('./identify-requester/identify-requester');
const logRequest = require('./log-request/log-request');

// Max number of requests per requester. Plan is for this to be configurable and loaded from the DB.
let maxRequests = 100;

// Period over which to restrict requests. Also planned to be configurable in the DB. Value in ms.
let limitPeriod = 3600000;

const getNumberOfRequests = async requesterId => {
    let earliestTime = new Date(Date.now() - limitPeriod).toISOString();
    let res = await db.query('SELECT COUNT(*) FROM requestLog WHERE requestId = $1 AND timestamp > $2', [requesterId, earliestTime]);
    return res.rows[0].count;
};

/* start test code */
// This does not need to be a public function, but includes complexity that is worth testing in isolation
// Could use grunt-strip-code to remove it for prod, but I won't worry about that now.
module.exports.getNumberOfRequests = getNumberOfRequests;
/* end test code */

module.exports.isRestricted = async requesterId => {
    let numberOfRequests = await getNumberOfRequests(requesterId);
    return numberOfRequests >= maxRequests;
};

module.exports.getRequesterId = req => {
    return idRequester.getRequesterId(req);
};

module.exports.logRequest = async (requesterId, curTime) => {
    return await logRequest.logRequest(requesterId, curTime);
};
