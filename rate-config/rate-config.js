

// Max number of requests per requester. Plan is for this to be configurable and loaded from the DB.
let maxRequests = 100;

// Period over which to restrict requests. Also configurable. Value in ms.
// let limitPeriod = 3600000;

const checkNumberOfRequests = requesterId => {
    // let earliestTime = curTime - limitPeriod;
    // Select count From requestLog Where requesterId = requesterId And timestamp > earliestTime
    let n = requesterId === '54.189.23.72' ? 53 : 101;
    return n;
};

/* start test code */
// This does not need to be a public function, but includes complexity that is worth testing in isolation
// Could use grunt-strip-code to remove it for prod, but I won't worry about that now.
module.exports.checkNumberOfRequests = checkNumberOfRequests;
/* end test code */

module.exports.isRestricted = requesterId => {
    return checkNumberOfRequests(requesterId) >= maxRequests;
};
