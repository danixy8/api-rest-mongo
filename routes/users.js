const express = require('express');
const User = require('../models/user_model');
const route = express.Router();

route.get('/', (req, res) => { 
  res.json('Listo el GET de usuarios');
});

route.post('/', (req, res) => { 
  let body = req.body;
  let result = createUser(body);

  result.then(user => { 
    res.json({
      valor: user
    })
  }).catch(err => {
    res.status(400).json({ 
      error: err
    })
  });
});

async function createUser(body){
  let user = new User({
    email: body.email,
    name: body.name,
    password: body.password
  });
  return await user.save();
};

module.exports = route;