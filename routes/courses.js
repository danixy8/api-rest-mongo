const express = require('express');
const route = express.Router();

route.get('/', (req, res) => { 
  res.json('Listo el GET de cursos');
});

module.exports = route;