const assert=require("chai").assert;
const chai = require('chai');
var expect = require("chai").expect;
var should = chai.should();
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
      .get('/Invalidpath')
      .then(function(res) {
        expect(res).to.have.status(404);     
      })
      .catch(function(err) {
          throw new Error('Path exists!');
      });
  });

});

// testing countries and their postals
describe('/cities End-Point', () => {   
  let testCities=[{c:'az',p:"42"},{c:'us',p:"12"}];
    it('should return stated country and postal code', (done) => {
       for(var i=0 ; i<testCities.length;i++){    
        chai.request(app)
            .get('/api/worldcities?p='+testCities[i].c+'&'+'c='+ testCities[i].p)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                var bodyObj=res.body;
              // test each object
            bodyObj.forEach(function(objitem){
               assert.include(objitem.cc.toLowerCase(),testCities[i].c, 'this must be the country');
               assert.include(objitem.pc.toLowerCase(),testCities[i].p, 'athis must be the postal code');

             });             
          });
      
      }
    done();
  }); 
    
});

