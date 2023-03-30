
const express = require('express')
const userController = require('../controllers/user')

const userRouter = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - firstname
 *         - lastname
 *       properties:
 *         username:
 *           type: string
 *           description: The username of the user, which will be the key of data storage
 *         firstname:
 *           type: string
 *           description: The firstname of the user
 *         lastname:
 *           type: string
 *           description: The lastname of the user
 *       example:
 *         username: MC_Chess
 *         firstname: Magnus
 *         lastname: Carlsen
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: The Users managing API
 * /user:
 *   post:
 *     summary: Create a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: The created user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 *
 */

/**
 * @swagger
 * tags:
 *   name: User
 *   description: The Users managing API
 * /user/{username}:
 *   get:
 *     summary: Get a specific user by his username
 *     tags: [User]
 *     parameters:
 *       - in: path
 *         name: username
 *         schema:
 *           type: string
 *         required: true
 *         description: The username of the user to get
 *     responses:
 *       200:
 *         description: The User
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: The User was not found
 *
 */

userRouter
  .post('/', async (req, res) => {
    
    try {

      const { username, firstname, lastname } = req.body;

      console.log(username, firstname, lastname);

      const user = await userController.create({
        username,
        firstname,
        lastname
      });

      res.status(201).json({
        status: "success",
        msg: user
      });

    } catch (err) {

      res.status(400).json({
        status: "error",
        msg: err.message

      })

    }
  })
  .get('/:username', async (req, res) => {

    try {

      const { username } = req.params;

      const data = await userController.get(username);

      res.status(200).json({
        status: "success",
        msg: data
      })

    } catch (err) {

      res.status(404).json({
        status: "error",
        msg: err.message
      })

    }

  })
  
module.exports = userRouter