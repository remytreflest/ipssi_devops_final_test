const db = require('../dbClient')

module.exports = {
  async create({ username, firstname, lastname }) {

    if(!username)
      throw new Error("Wrong user parameters");

    const existedUser = await db.hGetAll(username);

    console.log(existedUser);

    if(existedUser != undefined && Object.keys(existedUser).length)
      throw new Error("User already exists", null);

    const newUser = {
      firstname,
      lastname
    };

    await db.hSet(username, newUser);

    return newUser;
  },
  async get(username) {

    const user = await db.hGetAll(username);

    return user;
  }
}
