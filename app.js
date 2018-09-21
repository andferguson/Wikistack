'use strict';
const express = require('express');
const app = express();
const morgan = require('morgan');
const main = require('./views/main');

app.use(morgan('dev'));

app.use(express.static(__dirname + "/public"));

app.get('/', (req, res) => {
    res.send(main(''));
})

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`App listening in port ${PORT}`);
  });