const db = require('../dbClient')

module.exports = {

  /**
   * Permit to create an user
   *
   * @param   username  The username of the user.
   * @param   firstname  The firstname of the user.
   * @param   lastname  The lastname of the user.
   * @returns The created user in case of success or an error message.
   */
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

  /**
   * Permit to found an user
   *
   * @param   username  The username of the user.
   * @returns The user in case of success or an not found message.
   */
  async get(username) {

    const user = await db.hGetAll(username);

    return user;
  }
}
