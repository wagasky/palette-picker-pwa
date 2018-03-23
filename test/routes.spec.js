const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);

const environment = process.env.NODE_ENV || 'test'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

describe('Client Routes', () => {
  

  before( done => {   
   database.migrate.rollback()
    .then( () => {
      return database.migrate.latest()
    })
    .then( () => {
      done()
    })
  })

  beforeEach( done => {
    database.seed.run()
      .then( () => {
        done()
    })
  })
  
   it('should return the homepage', () => {
    return chai.request(server)
    .get('/')
    .then(response => {
      response.should.have.status(200);
      response.should.be.html;
    })
    .catch(err => {
      throw err;
    });
  });

  it('should return a 404 for a route that does not exist', () => {
    return chai.request(server)
    .get('/badURL')
    .then(response => {
      response.should.have.status(404);
    })
    .catch(err => {
      throw err;
    });
  });
});

describe('API Routes', () => {

  beforeEach( done => {
    database.migrate.rollback()
      .then( () => {
        database.migrate.latest()
      .then( () => {
         return database.seed.run()
        .then( () => {
          done()
        })
      })
   })
  })

    describe('GET /api/v1/projects', () => {
      it('should return all of the projects', () => {
        return chai.request(server)
        .get('/api/v1/projects')
        .then(response => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(1);
          response.body[0].should.have.property('name')
          response.body[0].name.should.equal('TestProject3')
        })
        .catch(err => {
          throw err;
        });
      });
    });

    describe('GET /api/v1/palettes', () => {
      it('should return all of the palettes', () => {
        return chai.request(server)
        .get('/api/v1/palettes')
        .then(response => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(2);
          response.body[0].should.have.property('name')
          response.body[0].name.should.equal('Green Palette')
          response.body[0].should.have.property('id');
          response.body[0].id.should.equal(1);
          response.body[0].should.have.property('colors');
          response.body[0].colors.should.be.a('array');
        })
        .catch(err => {
          throw err;
        });
      });
    });

    describe('POST /api/v1/projects', () => {
      it('should create a new project within the database', () => {
      return chai.request(server)
      .post('/api/v1/projects')
      .send({                  
        name: 'Test',
      })
      .then(response => {
        response.should.have.status(201); 
        response.body.should.be.a('object');
        response.body.should.have.property('id');
        response.body.id.should.equal(2);
      })
      .catch(err => {
        throw err;
      });
    });
  });

    describe('POST /api/v1/palettes', () => {
      it('should create a new palette within a project', () => {
      return chai.request(server)
      .post('/api/v1/palettes')
      .send({                  
        name: 'Blah Palette',
        project_id: 1,
        colors: ['#3db8bb', '#3db8bb', '#3db8bb', '#3db8bb', '#3db8bb']
      })
      .then(response => {
        response.should.have.status(201);
        response.should.be.json;
        response.body.should.be.a('object');
        response.body.should.have.property('id');
        response.body.id.should.equal(3);
      })
      .catch(err => {
        throw err;
      });
    });
  });
});
