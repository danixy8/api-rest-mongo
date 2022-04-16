const users = require('./routes/users');
const courses = require('./routes/courses');
const auth = require('./routes/auth');
const express = require('express');
const mongoose = require('mongoose');
const config = require('config');

//conectarnos a la base de datos
mongoose.connect(config.get('configDB.HOST'))
  .then(()=> console.log('conectado a mongo'))
  .catch(err => console.log('No se pudo conectar con MongoDB...', err));

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/users', users);
app.use('/api/courses', courses);
app.use('/api/auth', auth);

const port = process.env.port || 3000;

app.listen(port, () => {
  console.log(`running in port ${port}`)
});