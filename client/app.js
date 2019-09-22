const express = require('express');
const path = require('path');
const logger = require('morgan');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

const PAGES = [
  {name: 'files', title: 'Files'},
  {name: 'branches', title: 'Branches'},
  {name: 'file_history', title: 'File History'},
  {name: 'readme', title: 'README.md'}
];

PAGES.forEach(page => {
  app.get(`/${page.name}.html`, (req, res) => res.render(page.name, {title: page.title}));
});


const port = 3001;
app.listen(port, () => {
  console.info(`Listening on port ${port}!`);
  console.info(`-------`);
  console.info(`Links to the pages:`);

  PAGES.forEach(page => {
    console.info(`http://localhost:3001/${page.name}.html - ${page.title}`);
  });
});

module.exports = app;
