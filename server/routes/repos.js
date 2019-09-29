const express = require('express');
const router = express.Router();
const {getRepos, cloneRepo, removeRepo, getCommits, getDiff, getTree, getBlob} = require('../lib/git');
const path = require('path');
const logger = require('morgan');
router.use(logger('dev'));

/* GET listing of repositories. */
router.get('/', async function (req, res, next) {
  try {
    res.json(await getRepos(req.argv.reposDir));
  } catch (e) {
    next(e);
  }
});

/* POST clone external repository. */
router.post('/', async function (req, res, next) {
  try {
    const {url} = req.body || {};
    if (!url) {
      res.status(400).send('`url` body param is required');
      return;
    }

    await cloneRepo(req.argv.reposDir, url);

    res.status(201).send();
  } catch (e) {
    next(e);
  }
});
/* DELETE local repository. */
router.delete('/:repositoryId', async function (req, res, next) {
  try {
    const {repositoryId} = req.params;

    const repos = await getRepos(req.argv.reposDir);
    if (!repos.includes(repositoryId)) {
      res.status(404).send(`Repository ${repositoryId} does not exist`);
      return;
    }

    const repositoryPath = path.resolve(req.argv.reposDir, repositoryId);
    await removeRepo(repositoryPath);

    res.status(204).send();
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
      res.status(404).send(`Repository ${repositoryId} does not exist`);
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
      res.status(404).send(`Repository ${repositoryId} does not exist`);
      return;
    }

    const repositoryPath = path.resolve(req.argv.reposDir, repositoryId);
    const diff = await getDiff(repositoryPath, commitHash);
    res.json(diff);
  } catch (e) {
    next(e);
  }
});

/* GET tree. */
router.get(['/:repositoryId', '/:repositoryId/tree/:commitHash/*'], async function (req, res, next) {
  try {
    const {repositoryId, commitHash} = req.params;

    const repos = await getRepos(req.argv.reposDir);
    if (!repos.includes(repositoryId)) {
      res.status(404).send(`Repository ${repositoryId} does not exist`);
      return;
    }

    const repositoryPath = path.resolve(req.argv.reposDir, repositoryId);
    const tree = await getTree(repositoryPath, commitHash || 'master', req.params[0] || '.');

    res.json(tree);
  } catch (e) {
    next(e);
  }
});

/* GET blob. */
router.get('/:repositoryId/blob/:commitHash/*', async function (req, res, next) {
  try {
    const {repositoryId, commitHash} = req.params;

    const repos = await getRepos(req.argv.reposDir);
    if (!repos.includes(repositoryId)) {
      res.status(404).send(`Repository ${repositoryId} does not exist`);
      return;
    }

    const repositoryPath = path.resolve(req.argv.reposDir, repositoryId);
    const stream = getBlob(repositoryPath, commitHash || 'master', req.params[0] || '.');

    stream.stdout.on('data', res.write.bind(res));
    stream.stderr.on('data', (chunk) => console.error(chunk.toString()));
    stream.on('exit', (code) => {
      if (code !== 0) {
        res.status(500);
      }

      res.end();
    });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
