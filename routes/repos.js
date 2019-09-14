const express = require('express');
const router = express.Router();
const {readdir} = require('fs').promises;
const {getCommits} = require('../lib/git');
const path = require('path');

/* GET listing of repositories. */
router.get('/', async function (req, res, next) {
  try {
    res.json(await getRepos(req.argv.reposDir));
  } catch (e) {
    next(e);
  }
});

/* GET listing of commits. */
router.get('/:repositoryId/commits/:commitHash', async function (req, res, next) {
  try {
    const {repositoryId, commitHash} = req.params;

    const repos = await getRepos(req.argv.reposDir);
    if (!repos.includes(repositoryId)) {
      res.status(400).send(`Repository ${repositoryId} does not exists`);
      return;
    }

    const repositoryPath = path.resolve(req.argv.reposDir, repositoryId);
    const commits = await getCommits(repositoryPath, commitHash);
    res.json(commits);
  } catch (e) {
    next(e);
  }
});

async function getRepos(path) {
  let files = await readdir(path, {withFileTypes: true});
  return files
    .filter(file => file.isDirectory())
    .map(file => file.name);
}

module.exports = router;
