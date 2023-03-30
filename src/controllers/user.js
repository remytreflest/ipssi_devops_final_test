/**
 * This controller is used perform request about users<br>
 * Like create or fetch a user
 */

const db = require('../dbClient')

module.exports = {
  /**
   * Controller method to create a user entity in the Redis database
   * @param username String | The complete name of the user
   * @param firstname String | The firstname of the user
   * @param lastname String | The lastname of the user
   * @returns {Promise<{firstname, lastname}>}
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
   * Fetch the user object matching the given username from the Redis database<br>
   * The result contains all related fields to this user
   * @param username The identifier used to retrieve the searched user
   * @returns The user in case of success or a not found message.   */
  async get(username) {
    const user = await db.hGetAll(username);

    return user;
  }
}
