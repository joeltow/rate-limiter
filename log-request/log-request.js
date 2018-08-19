const db = require('../db/db');

/* Ideally, check for existence of table or create table.
Manually create table:
    CREATE TABLE requestLog(
	    requestId VARCHAR (355) NOT NULL,
	    timestamp TIMESTAMPTZ NOT NULL
    );

    CREATE INDEX countRequest_index
    ON requestLog (requestId, timestamp);
*/

module.exports.logRequest = async (requesterId, curTime) => {
    try {
        const res = await db.query('INSERT INTO requestLog(requestId, timestamp) VALUES($1, $2)', [requesterId, curTime]);
    } catch (err) {
        console.log(err);
    };
};