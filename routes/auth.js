const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user_model');
const route = express.Router();
const config = require('config');

route.post('/', (req, res) => {
  User.findOne({email: req.body.email})
  .then((data) => {
    if(data){
      const validPassword = bcrypt.compareSync(req.body.password, data.password);
      if(!validPassword) return res.status(400).json({error: 'ok', message:'incorrect user or pass'})
      const jwtoken = jwt.sign({
        user: {_id: data._id, name: data.name, email: data.email}
      }, config.get('configToken.SEED'), { expiresIn: config.get('configToken.expiration') });
      res.json({
        user: {
          _id: data._id,
          name: data.name,
          email: data.email
        },
        token: jwtoken
      })
      // jwt.sign({_id: data._id, name: data.name, email: data.email}, 'password')
      // res.send(jwtoken);
    }else{ 
      res.status(400).json({
        error: 'ok',
        message: 'incorrect user or pass'
      })
    }
  })
  .catch((err) => {
    res.status(404).json({
      message: 'service error',
      error: err
    });
  })
})

module.exports = route;