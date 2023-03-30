const app = require('../src/server')
const chai = require('chai')
const chaiHttp = require('chai-http')
const db = require('../src/dbClient')
const describe = require('mocha').describe;
const userController = require("../src/controllers/user");
const {expect} = require("chai");
const {response} = require("express");

chai.use(chaiHttp)

describe('User REST API', () => {
  
    beforeEach(() => {
      // Clean DB before each test
      db.flushDb()
    })
    
    after(() => {
      app.close()
      db.quit()
    })

    describe('POST /user', () => {
        it('create a new user', (done) => {
            const user = {
                username: 'sergkudinov',
                firstname: 'Sergei',
                lastname: 'Kudinov'
            }

            chai.request(app)
                .post('/user')
                .send(user)
                .then((res) => {
                    chai.expect(res).to.have.status(201)
                    chai.expect(res.body.status).to.equal('success')
                    chai.expect(res).to.be.json
                    done()
                })
                .catch((err) => {
                    throw err
                })
        })

        it('pass wrong parameters', (done) => {
            const user = {
                firstname: 'Sergei',
                lastname: 'Kudinov'
            }

            chai.request(app)
                .post('/user')
                .send(user)
                .then((res) => {
                    chai.expect(res).to.have.status(400)
                    chai.expect(res.body.status).to.equal('error')
                    chai.expect(res).to.be.json
                    done()
                })
                .catch((err) => {
                   throw err
                })
        })
    })

    describe('POST /user/random', () => {
        it('no given parameter should throw error', async () => {
            chai.request(app)
                .post('/user/random/')
                .send("")
                .then((res) => {
                    chai.expect(res).to.have.status(400)
                    chai.expect(res.body.status).to.equal('error')
                    chai.expect(res.body.msg).to.equal('Must fill the numberOfUsersToCreate parameter')
                    chai.expect(res).to.be.json
                })
        });

        // Nan users to create param, then throw Error
        it('given parameter is not a number, then thorw error', async () => {
            chai.request(app)
                .post('/user/random/NotANumber')
                .send("")
                .then((res) => {
                    chai.expect(res).to.have.status(400)
                    chai.expect(res.body.status).to.equal('error')
                    chai.expect(res.body.msg).to.equal('The numberOfUsersToCreate parameter must be a positive integer')
                    chai.expect(res).to.be.json
                })
        });

        // Negative users to create param, then throw Error
        it('negative parameter should throw error', async () => {
            chai.request(app)
                .post('/user/random/-45')
                .send("")
                .then((res) => {
                    chai.expect(res).to.have.status(400)
                    chai.expect(res.body.status).to.equal('error')
                    chai.expect(res.body.msg).to.equal('The numberOfUsersToCreate parameter must be a positive integer')
                    chai.expect(res).to.be.json
                })
        });

        // Given good param, then create users
        it('good parameters should create users', async () => {
            chai.request(app)
                .post('/user/random/-45')
                .send("")
                .then((res) => {
                    chai.expect(res).to.have.status(201)
                    chai.expect(res.body.status).to.equal('success')
                    chai.expect(res.body.msg).to.equal('Users have been created !')
                    chai.expect(res).to.be.json
                })
        });
    });

    describe('GET /user', ()=> {
    // TODO Create test for the get method
    })
})
