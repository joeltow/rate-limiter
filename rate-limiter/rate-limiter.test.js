const expect = require('expect');


const db = require('./db/db');
const rateLimiter = require('./rate-limiter');

jest.mock('./db/db');

describe('rate-limiter', () => {
    describe('getNumberOfRequests', ()=> {
        it('should return 53', async () => {
            const resp = {rows: [{count: 53}]};
            db.query.mockResolvedValue(resp);

            let requesterId = '54.189.23.72|someOtherId';
            let res = await rateLimiter.getNumberOfRequests(requesterId);
            
            expect(res).toBe(53);
        });

        it('should return 101', async () => {
            const resp = {rows: [{count: 101}]};
            db.query.mockResolvedValue(resp);
            
            let requesterId = '54.189.23.71';
            let res = await rateLimiter.getNumberOfRequests(requesterId);
        
            expect(res).toBe(101);
        });
    });

    describe('isRestricted', ()=> {
        it('should be unrestricted', async () => {
            const resp = {rows: [{count: 53}]};
            db.query.mockResolvedValue(resp);

            let requesterId = '54.189.23.72|someOtherId';
            let res = await rateLimiter.isRestricted(requesterId);
        
            expect(res).toBe(false);
        });

        it('should be restricted', async () => {
            const resp = {rows: [{count: 101}]};
            db.query.mockResolvedValue(resp);

            let requesterId = '54.189.23.71';
            let res = await rateLimiter.isRestricted(requesterId);
        
            expect(res).toBe(true);
        });
    });
});
