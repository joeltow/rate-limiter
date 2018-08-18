const expect = require('expect');

const rateConfig = require('./rate-config');

describe('rate-config', () => {
    describe('checkNumberOfRequests', ()=> {
        it('should return 53', () => {
            let requesterId = '54.189.23.72';
            let res = rateConfig.checkNumberOfRequests(requesterId);
        
            expect(res).toBe(53);
        });

        it('should return 101', () => {
            let requesterId = '54.189.23.71';
            let res = rateConfig.checkNumberOfRequests(requesterId);
        
            expect(res).toBe(101);
        });
    });

    describe('isRestricted', ()=> {
        it('should be unrestricted', () => {
            let requesterId = '54.189.23.72';
            let res = rateConfig.isRestricted(requesterId);
        
            expect(res).toBe(false);
        });

        it('should be restricted', () => {
            let requesterId = '54.189.23.71';
            let res = rateConfig.isRestricted(requesterId);
        
            expect(res).toBe(true);
        });
    });
});