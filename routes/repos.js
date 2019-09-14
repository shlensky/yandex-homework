const express = require('express');
const router = express.Router();
const {readdir} = require('fs').promises;

/* GET listing of repositories. */
router.get('/', async function (req, res, next) {
  try {
    res.json(await getDirs(req.argv.reposDir));
  } catch (e) {
    next(e);
  }
});

async function getDirs(path) {
  let files = await readdir(path, {withFileTypes: true});
  return files
    .filter(file => file.isDirectory())
    .map(file => file.name);
}

module.exports = router;
