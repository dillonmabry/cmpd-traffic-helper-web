process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../src/server/server');
let should = chai.should();

chai.use(chaiHttp);

//Sanity checks
describe('Accidents', () => {
  describe('/GET accidents top', () => {
    it('it should GET top 10 accidents', (done) => {
      chai.request(server)
        .get('/api/accidents/top?limit=10')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body["accidents"].should.be.a('array');
          res.body["accidents"].length.should.be.eql(10);
          done();
        });
    });
  });
});
describe('MapboxAPI', () => {
  //Unauthenticated
  describe('/GET mapbox-token', () => {
    it('it should GET the mapbox-token', (done) => {
      chai.request(server)
        .get('/api/accidents/mapbox-token')
        .end((err, res) => {
          res.should.have.status(403);
          done();
        });
    });
  });
});