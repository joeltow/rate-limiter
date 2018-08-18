const request = require('supertest');
const expect = require('expect');

let app = require('./server').app;

describe('server', () => {
    describe('GET /', () => {
        it('should return 501', (done) => {
            request(app)
                .get('/')
                .expect(501)
                .expect(res => {
                    expect(res.body).toHaveProperty('error', 'Not yet implemented.');
                })
                .end(done);
        });
    });
    
});