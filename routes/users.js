const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user_model');
const route = express.Router();
const Joi = require('joi');
const verificarToken = require('../middlewares/auth');

const schema = Joi.object({
  name: Joi.string()
      .min(3)
      .max(20)
      .required(),

  password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

  email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
});

route.get('/', verificarToken, (req, res) => {
  let result = listActiveUsers();
  result.then((users) => {
    res.json(users)
  }).catch((err) => {
    res.status(400).json({
      error: err
    })
  });
});

route.post('/', (req, res) => { 
  let body = req.body;

  User.findOne({email: body.email}, (err, user) => {
    if(err){ 
      return res.status(400).json({
        error: 'Server error'
      })
    }
    if(user){
      return res.status(400).json({
        message: 'user already exists'
      });
    }
    else{ 
      const {error, valor} = schema.validate({name: body.name, email: body.email});

      if(!error){
        let result = createUser(body);
    
        result.then(user => { 
          res.json({
            name: user.name,
            email: user.email
          })
        }).catch(err => {
          res.status(400).json({ 
            error: err
          })
        });
      }else{ 
        res.status(400).json({
          error: error.message
        });
      }
    }
  });
});

route.put('/:email', verificarToken, (req, res) => {
  let body = req.body;
  const {error, valor} = schema.validate({name: body.name});

  if(!error) {
    let result = updatedUser(req.params.email, body);
    result.then(valor => { 
      res.json({ 
        name: valor.name,
        email: valor.email
      })
    }).catch(err => { 
      res.status(400).json({ 
        error: err
      })
    });
  }else{ 
    res.status(400).json({ 
      error: error.message
    });
  }
});

route.delete('/:email', verificarToken, (req, res) => {
  let result = disableUser(req.params.email);
  result.then(valor => { 
    res.json({ 
      name: valor.name,
      email: valor.email
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
    password: bcrypt.hashSync(body.password, 10) 
  });
  return await user.save();
};

async function listActiveUsers(){
  let users = await User.find({status: true})
  .select({name: 1, email: 1});
  return users
};

async function updatedUser(email, body){ 
  let user = await User.findOneAndUpdate({email: email}, {
    $set: {
      name: body.name,
      password: body.password
    }
  },{new: true});
  return user
};

async function disableUser(email){ 
  let user = await User.findOneAndUpdate({email: email}, {
    $set: {
      status: false,
    } 
  },{new: true});
  return user;
};

module.exports = route;