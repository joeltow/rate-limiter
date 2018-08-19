const expect = require('expect');

const db = require('../db/db');
const logRequest = require('./log-request');

describe('log-request', () => {
    describe('query', ()=> {
        it('should log a request to the db', async () => {
            let requesterId = '54.189.23.71';
            let curTime = new Date(Date.now()).toISOString();
            let res = await logRequest.logRequest(requesterId, curTime);
            res = await db.query('SELECT COUNT(*) FROM requestLog WHERE requestId = $1 AND timestamp = $2', [requesterId, curTime])

            expect(res.rowCount).toBe(1);
        });
    });
});