const express = require('express');
const morgan = require('morgan');

const frogRouter = require('./routes/frogRoutes');

const app = express();

app.use(express.static(`${__dirname}/public`));

if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

app.use(express.json());

app.use((req, _, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/frogs', frogRouter);

module.exports = app;
