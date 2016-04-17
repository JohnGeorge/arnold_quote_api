var request = require('supertest');
var app = require('../../app');
var chai = require('chai');
var expect = chai.expect;
chai.use(require('chai3-json-schema'));
chai.tv4.banUnknown = true;

describe('Testing all quote endpoints', function() {
  it('Should load the root page for GET/', function(done) {
    request(app)
      .get('/')
      .expect(200)
      .expect('Content-Type', /html/)
      .end(done);
  });

  it('Should return valid quotes for GET/api/quotes', function(done) {
    request(app)
      .get('/api/quotes')
      .expect(200)
      .expect('Content-Type, /json/')
      .end(function(err, res) {
        for (var i = 0; i < res.body.length; i++) {
          expect(res.body[i]).to.be.jsonSchema({
            'title': 'Valid quote schema',
            'type': 'object',
            'properties': {
              '_id': {
                'type': 'number'
              },
              'quote': {
                'type': 'string'
              },
              'movie': {
                'type': 'string'
              },
              'character': {
                'type': 'string'
              },
              '__v': {
                'type': 'number'
              }
            }
          });
        }
        done();
      });
  });

  it('Should return valid quote for GET/api/quote/:id', function(done) {
    request(app)
      .get('/api/quotes/1')
      .expect(200)
      .expect('Content-Type, /json/')
      .end(function(err, res) {
        expect(res.body).to.be.jsonSchema({
          'title': 'Valid quote schema',
          'type': 'object',
          'properties': {
            '_id': {
              'type': 'number'
            },
            'quote': {
              'type': 'string'
            },
            'movie': {
              'type': 'string'
            },
            'character': {
              'type': 'string'
            },
            '__v': {
              'type': 'number'
            }
          }
        });
        done();
      });
  });

  it('Should return successful response for POST/api/quote', function(done) {
    request(app)
      .post('/api/quote')
      .expect(200)
      .send({
        quote: 'testing quote post',
        movie: 'test movie post',
        character: 'test character post'
      })
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        expect(res.body).to.be.jsonSchema({
          'title': 'successful post message',
          'type': 'object',
          'properties': {
            'message': {
              'type': 'string'
            }
          }
        });
        console.log('      ' + res.body.message);
        done(err);
      });
  });

  it('Should return successful response for PUT/api/quote/:id', function(done) {
    request(app)
      .put('/api/quote/1')
      .expect(200)
      .send({
        quote: 'testing quote put',
        movie: 'test movie put',
        character: 'test character put'
      })
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        expect(res.body).to.be.jsonSchema({
          'title': 'successful put message',
          'type': 'object',
          'properties': {
            'message': {
              'type': 'string'
            }
          }
        });
        console.log('      ' + res.body.message);
        done();
      });
  });

  it('Should return successful response for DELETE/api/quote/:id', function(done) {
    request(app)
      .delete('/api/quote/1')
      .expect(200)
      .set('Content-Type', 'application/json')
      .end(function(err, res) {
        expect(res.body).to.be.jsonSchema({
          'title': 'successful delete message',
          'type': 'object',
          'properties': {
            'message': {
              'type': 'string'
            }
          }
        });
        console.log('      ' + res.body.message);
        done();
      });
  });
});
