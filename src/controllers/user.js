const db = require('../dbClient')

module.exports = {
  async create({ username, firstname, lastname }) {
    // Check parameters
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
    // TODO create this method
    // db.hmget(username, ["firstname", "lastname"], (err, res) => {
    //   if (err) return callback(err, null)
    //   callback(null, res) // Return callback
    // })
    const user = await db.hGetAll(username);

    return user;
  }
}
