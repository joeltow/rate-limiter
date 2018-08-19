const expect = require('expect');

const db = require('../db/db');
const rateConfig = require('./rate-config');

jest.mock('../db/db');

describe('rate-config', () => {
    describe('getNumberOfRequests', ()=> {
        it('should return 53', async () => {
            const resp = {rows: [{count: 53}]};
            db.query.mockResolvedValue(resp);

            let requesterId = '54.189.23.72|someOtherId';
            let res = await rateConfig.getNumberOfRequests(requesterId);
            
            expect(res).toBe(53);
        });

        it('should return 101', async () => {
            const resp = {rows: [{count: 101}]};
            db.query.mockResolvedValue(resp);
            
            let requesterId = '54.189.23.71';
            let res = await rateConfig.getNumberOfRequests(requesterId);
        
            expect(res).toBe(101);
        });
    });

    describe('isRestricted', ()=> {
        it('should be unrestricted', async () => {
            const resp = {rows: [{count: 53}]};
            db.query.mockResolvedValue(resp);

            let requesterId = '54.189.23.72|someOtherId';
            let res = await rateConfig.isRestricted(requesterId);
        
            expect(res).toBe(false);
        });

        it('should be restricted', async () => {
            const resp = {rows: [{count: 101}]};
            db.query.mockResolvedValue(resp);

            let requesterId = '54.189.23.71';
            let res = await rateConfig.isRestricted(requesterId);
        
            expect(res).toBe(true);
        });
    });
});