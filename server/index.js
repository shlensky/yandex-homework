const express = require('express');
const bodyParser = require('body-parser');
const yargs = require('yargs');

// Check node version
require('./check_node_version');

const reposRouter = require('./routes/repos');
const clientRouter = require('../client/app');

const DEFAULT_PORT = 3000;

// eslint-disable-next-line no-unused-expressions
yargs.command('$0 <repos-dir> [port]', 'start server', {}, (argv) => {
  const app = express();
  app.locals.port = argv.port || DEFAULT_PORT;

  app.use(bodyParser.json());

  // Push command line arguments to next middlewares
  app.use((req, res, next) => {
    req.argv = argv;
    next();
  });

  app.use('/api/repos', reposRouter);
  app.use('/', clientRouter);

  app.listen(app.locals.port, () => console.info(`Listening on port ${app.locals.port}!`));
}).argv;
