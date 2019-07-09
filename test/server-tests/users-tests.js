process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../src/server/server');
const User = require('../../src/server/models/User');
let should = chai.should();

chai.use(chaiHttp);

//Sanity checks
describe('User register', () => {
    //Register
    describe('/POST register', () => {
        it('it should POST the user registration', (done) => {
            chai.request(server)
                .post('/api/users/register')
                .set('content-type', 'application/json')
                .send({ username: 'test', password: 'test', email: 'test@gmail.com', password2: 'test' })
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });
    describe('/POST login', () => {
        it('it should POST the user login', (done) => {
            chai.request(server)
                .post('/api/users/login')
                .set('content-type', 'application/json')
                .send({ username: 'test', password: 'test' })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body["token"].should.be.a('string');
                    done();
                });
        });
    });
    describe('/POST login incorrect, username', () => {
        it('it should throw 401 for bad username', (done) => {
            chai.request(server)
                .post('/api/users/login')
                .set('content-type', 'application/json')
                .send({ username: 'test2', password: 'test' })
                .end((err, res) => {
                    res.should.have.status(401);
                    res.text.should.equal('bad username');
                    done();
                });
        });
    });
    describe('/POST login incorrect, password', () => {
        it('it should throw 403 for bad password', (done) => {
            chai.request(server)
                .post('/api/users/login')
                .set('content-type', 'application/json')
                .send({ username: 'test', password: 'test2' })
                .end((err, res) => {
                    res.should.have.status(403);
                    res.text.should.equal('passwords do not match');
                    done();
                });
        });
    });
    describe('/POST register repeat', () => {
        it('it should throw 403 if duplicate registration', (done) => {
            chai.request(server)
                .post('/api/users/register')
                .set('content-type', 'application/json')
                .send({ username: 'test', password: 'test', email: 'test@gmail.com', password2: 'test' })
                .end((err, res) => {
                    res.should.have.status(403);
                    res.text.should.equal('username or email already taken');
                    done();
                });
        });
    });
    //Cleanup
    after(() => {
        User.findOne({ username: 'test' })
        .then(user => {
            user.remove();
        })
    });
});