const expect = require('expect');

const idrequester = require('./identify-requester');

describe('Requester', () => {
    describe('identify-requester', ()=> {
        it('should return requesterId', () => {
            let req = {
                connection: {
                    remoteAddress: '54.189.23.72'
                },
                ip: '54.189.23.71',
                headers: {
                    host: '127.0.0.1:54339',
                    'accept-encoding': 'gzip, deflate',
                    'user-agent': 'node-superagent/3.8.2',
                    connection: 'close'
                }
            };
            let res = idrequester.getRequesterId(req);
        
            expect(res).toBe('54.189.23.72');
        });
    });
});
