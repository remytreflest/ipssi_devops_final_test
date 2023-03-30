const { expect } = require('chai')
const userController = require('../src/controllers/user')
const db = require('../src/dbClient')

describe('User', () => {
  
  beforeEach(() => {
    // Clean DB before each test
    db.flushDb()
  })

  describe('Create', () => {

    it('create a new user', async () => {
      const userForm = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      };
      const newUser = await userController.create(userForm);

      expect(newUser.firstname).to.equal(userForm.firstname);
      expect(newUser.lastname).to.equal(userForm.lastname);
    })

    it('passing wrong user parameters', async () => {
      const badUserForm = {
        firstname: 'Sergei',
        lastname: 'Kudinov'
      };

      try {
        await userController.create(badUserForm);
      } catch (err) {
        expect(err).to.not.be.equal(null);
      }
    })

    it('avoid creating an existing user', async ()=> {
      // TODO create this test
      // Warning: the user already exists
      const user = {
        username: 'sergkudinov',
        firstname: 'Sergei',
        lastname: 'Kudinov'
      };

      try {
        await userController.create(user)
      } catch (err) {
        expect(err).to.not.be.equal(null)
      }
    })
  })

  // TODO Create test for the get method
  describe('Get', ()=> {
    
    // it('get a user by username', (done) => {
    //   // 1. First, create a user to make this unit test independent from the others
    //   // 2. Then, check if the result of the get method is correct
    //   const user = {
    //     username: 'sergkudinov',
    //     firstname: 'Sergei',
    //     lastname: 'Kudinov'
    //   }
    //   userController.create(user);
    //   let datas = userController.get(user.username);
    //   expect(datas).to.not.be.equal(null);
    //   done()
    // })
  
    // it('cannot get a user when it does not exist', (done) => {
    //   // Chech with any invalid user
    //   const user = {
    //     username: 'popipo',
    //     firstname: 'popipo',
    //     lastname: 'popipo'
    //   }
    //   expect(userController.get(user.username)).to.be.equal(null);
    //   done()
    // })
  
  })
})