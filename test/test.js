const chai = require('chai');
var expect = require("chai").expect;
chai.use(require('chai-http'));

var app = require("../app.js");
describe('API endpoints', function() {
  this.timeout(3000); // How long to wait for a response (ms)

  before(function() {

  });

  after(function() {

  });

  // GET - List all colors
  it('should return load the home page', function() {
    return chai.request(app)
      .get('/')
      .then(function(res) {
        expect(res).to.have.status(200);
      });
  });

  // GET - Invalid path
  it('should return Not Found', function() {
    return chai.request(app)
      .get('/INVALID_PATH')
      .then(function(res) {
        throw new Error('Path exists!');
      })
      .catch(function(err) {
        expect(err).to.have.status(404);
      });
  });

  // get countries and their postals
  it('should return country details', function() {
    return chai.request(app)
      .get('/api/worldcities?c=us&p=12')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
      });
  });

  });