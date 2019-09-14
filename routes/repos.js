const express = require('express');
const router = express.Router();
const {readdir} = require('fs').promises;
const {getCommits, getDiff, getTree} = require('../lib/git');
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
      res.status(404).send(`Repository ${repositoryId} does not exists`);
      return;
    }

    const repositoryPath = path.resolve(req.argv.reposDir, repositoryId);
    const commits = await getCommits(repositoryPath, commitHash);
    res.json(commits);
  } catch (e) {
    next(e);
  }
});

/* GET diff of commit. */
router.get('/:repositoryId/commits/:commitHash/diff', async function (req, res, next) {
  try {
    const {repositoryId, commitHash} = req.params;

    const repos = await getRepos(req.argv.reposDir);
    if (!repos.includes(repositoryId)) {
      res.status(404).send(`Repository ${repositoryId} does not exists`);
      return;
    }

    const repositoryPath = path.resolve(req.argv.reposDir, repositoryId);
    const diff = await getDiff(repositoryPath, commitHash);
    res.json(diff);
  } catch (e) {
    next(e);
  }
});


router.get(['/:repositoryId', '/:repositoryId/tree/:commitHash/*'], async function (req, res, next) {
  try {
    const {repositoryId, commitHash} = req.params;

    const repos = await getRepos(req.argv.reposDir);
    if (!repos.includes(repositoryId)) {
      res.status(404).send(`Repository ${repositoryId} does not exists`);
      return;
    }

    const repositoryPath = path.resolve(req.argv.reposDir, repositoryId);
    const tree = await getTree(repositoryPath, commitHash || "master", req.params[0] || ".");

    res.json(tree);
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
