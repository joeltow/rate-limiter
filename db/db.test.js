const expect = require('expect');

const db = require('./db');

/* These tests are more like integration tests than unit tests.
    As I develop, this is the mechanism I used to make sure the integration with Postgres was working.
    In future, we could use mocking to unit test and create more reliable integration tests. */

describe('db', () => {
    describe('query', ()=> {
        it('should log a request to the db', async () => {
            let requesterId = '54.189.23.72';
            let curTime = new Date(Date.now()).toISOString();
            let res = await db.query('INSERT INTO requestLog(requestId, timestamp) VALUES($1, $2)', [requesterId, curTime]);
            res = await db.query('SELECT COUNT(*) FROM requestLog WHERE requestId = $1 AND timestamp = $2', [requesterId, curTime])

            expect(res.rowCount).toBe(1);
        });
    });
});