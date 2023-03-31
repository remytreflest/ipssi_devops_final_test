/**
 * This controller is used perform request about users<br>
 * Like create or fetch a user
 */

const db = require('../dbClient')

module.exports = {
    /**
     * Permit to create a user
     *
     * @param   username  The username of the user.
     * @param   firstname  The firstname of the user.
     * @param   lastname  The lastname of the user.
     * @returns The created user in case of success or an error message.
     */
    async create({username, firstname, lastname}) {

        if (!username)
            throw new Error("Wrong user parameters");

        const existedUser = db.hGetAll(username);
        let userAlreadyExists = !!(existedUser !== undefined && Object.keys(existedUser).length);

        if (userAlreadyExists) {
            throw new Error("User already exists");
        }

        const newUser = {
            firstname,
            lastname
        };

        await db.hSet(username, newUser);

        return newUser;
    },
    /**
     * Permit to create a bunch of random users
     * @param numberOfUsersToCreate The number of users to generate
     * @returns void
     */
    async createRandom({numberOfUsersToCreate}) {
        if (!numberOfUsersToCreate) {
            throw new Error("Must fill the numberOfUsersToCreate parameter");
        }
        if (isNaN(numberOfUsersToCreate) || numberOfUsersToCreate < 0) {
            throw new Error("The numberOfUsersToCreate parameter must be a positive integer");
        }

        try {
            for (let i = 0; i < numberOfUsersToCreate; i++) {
                /**
                 * Generate a random User
                 * @returns The generated user
                 */
                let generateRandomUser = () => {
                    let firstnames = ["Francis", "XxX_Dark", "Pablo", "Jean", "Maria", "Jacque", "Remy", "Romain", "Damien", "Nathan", "Mohammed", "Lisa", "Louis", "Mickael", "Elena", "Clément", "William"];
                    let lastnames = ["Tabouret", "Sasuke_XxX", "Table", "Waramunt", "Alba", "Lancaster", "Chan", "Chirac", "Magellan", "Collomb", "Yakitori"];

                    let firstnameIndex = Math.floor(Math.random() * firstnames.length);
                    let firstname = firstnames[firstnameIndex];

                    let lastnameIndex = Math.floor(Math.random() * lastnames.length);
                    let lastname = lastnames[lastnameIndex];

                    let username = firstname + " " + lastname;

                    return {
                        firstname: firstname,
                        lastname: lastname,
                        username: username
                    }
                };

                /**
                 * Verify in database that the given user already exists or not
                 * @param usernameToVerify The username to check in database
                 * @returns {boolean} TRUE if user already exists, otherwise FALSE
                 */
                let userAlreadyExists = (usernameToVerify) => {
                    const existedUser = db.hGetAll(usernameToVerify);
                    return !!(existedUser !== undefined && Object.keys(existedUser).length);
                }

                let randomUser = generateRandomUser();

                // while exists in db, re-generate new user
                while (userAlreadyExists(randomUser.username)) {
                    randomUser = generateRandomUser();
                }

                console.log(randomUser);

                // Then insert it in db
                await db.hSet(randomUser.username, {
                    firstname: randomUser.firstname,
                    lastname: randomUser.lastname
                });
            }

            // return success response
        } catch (error) {
            // return error response
            console.log(error);
            throw new Error("An unexpected error occurred when generating users!");
        }
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
