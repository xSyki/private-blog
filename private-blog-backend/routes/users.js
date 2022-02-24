var express = require('express');
var router = express.Router();
var User = require('../models/User');

router.post('/', async (req, res) => {
  const {login, password} = req.body;

  try {
    const user = await User.create({login, password});
    await user.generateAuthToken();
    res.status(201).json(user);
  } catch (error) {
    let msg;
    if(error.code == 11000) {
      msg= 'Login already exists';
    } else {
      msg = error.message;
    }
    res.status(400).json(msg)
  }
})

router.post('/login', async(req, res) => {
  const {login, password} = req.body;
  try {
    const user = await User.findByCredentails(login, password);
    await user.generateAuthToken();
    res.json(user)
  } catch (e) {
    res.status(400).json(e.message);
  }
})

router.get('/', function(req, res, next) {
  res.json('users');
});

module.exports = router;
