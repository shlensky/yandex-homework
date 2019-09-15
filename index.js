const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const yargs = require('yargs');

// Check node version
require('./check_node_version');

const reposRouter = require('./routes/repos');

const DEFAULT_PORT = 3000;

yargs.command('$0 <repos-dir> [port]', 'start server', {}, (argv) => {
  const app = express();

  app.use(logger('dev'));
  app.use(bodyParser.json());

  // Push command line arguments to next middlewares
  app.use((req, res, next) => {
    req.argv = argv;
    next();
  });

  app.use('/api/repos', reposRouter);

  const port = argv.port || DEFAULT_PORT;
  app.listen(port, () => console.info(`Listening on port ${port}!`));
}).argv;
