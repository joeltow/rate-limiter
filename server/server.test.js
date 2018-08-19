const request = require('supertest');
const expect = require('expect');

let app = require('./server').app;
const db = require('../rate-limiter/db/db');

jest.mock('../rate-limiter/db/db');

describe('server', () => {
    describe('GET /', () => {
        it('should return success', (done) => {
            const resp = {rows: [{count: 53}]};
            db.query.mockResolvedValue(resp);

            request(app)
                .get('/')
                .expect(200)
                .expect(res => {
                    expect(res.text).toBe('Thanks for coming! Hope you found what you were looking for.');
                })
                .end(done);
        });

        it('should block access', (done) => {
            const resp = {rows: [{count: 101}]};
            db.query.mockResolvedValue(resp);

            request(app)
                .get('/')
                .expect(429)
                .expect(res => {
                    expect(res.body).toHaveProperty('error', 'Thank you for your dedication to our platform, but you may have the wrong address. Perhaps you will have more success with freelancer.com?');
                })
                .end(done);
        });
    });
    
});