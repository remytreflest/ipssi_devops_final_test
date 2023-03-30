const express = require('express')
const userController = require('../controllers/user')

const userRouter = express.Router()

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
  .get('/:username', async (req, res) => { // Express URL params - https://expressjs.com/en/guide/routing.html
    // TODO Create get method API
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
