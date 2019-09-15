const {exec, spawn} = require('child_process');
const {readdir} = require('fs').promises;
const os = require('os');
const {promisify} = require('util');

async function getRepos(reposPath) {
  let files = await readdir(reposPath, {withFileTypes: true});
  return files
    .filter(file => file.isDirectory())
    .map(file => file.name);
}

async function cloneRepo(reposPath, repoUrl) {
  const CLONE_COMMAND = `git --no-pager clone ${repoUrl}`;
  const options = {cwd: reposPath};

  await promisify(exec)(CLONE_COMMAND, options);
}

function parseCommitLine(line) {
  const [hash, created, author, ...message] = line.split('|');
  return {hash, created, author, message: message.join('|')};
}

async function getCommits(repoPath, branch) {
  const GET_COMMITS_COMMAND = `git --no-pager log --pretty=format:"%H|%ad|%an|%s" --no-decorate --date=iso ${branch}`;

  return new Promise((resolve, reject) => {
    try {
      const options = {cwd: repoPath};
      exec(GET_COMMITS_COMMAND, options,
        function (error, stdout) {
          if (error !== null) {
            reject(error);
            return;
          }

          const commits = stdout.split(os.EOL).map(parseCommitLine);
          resolve(commits);
        });

    } catch (e) {
      reject(e);
    }
  });
}

async function getDiff(repoPath, branch) {
  const GET_CHANGED_FILES_COMMAND = `git --no-pager diff --name-status ${branch}^!`;

  return new Promise(async (resolve, reject) => {
    try {
      const options = {cwd: repoPath};
      exec(GET_CHANGED_FILES_COMMAND, options,
        async function (error, stdout) {
          if (error !== null) {
            reject(error);
            return;
          }

          const changedFiles = stdout.split(os.EOL).filter(fileName => !!fileName.trim());

          Promise.all(changedFiles.map(async (fileNameWithStatus) => {
            const [status, fileName] = fileNameWithStatus.split('\t');

            const diffObject = status === 'D' ? {} : await getFileDiff(repoPath, branch, fileName);

            return {
              status,
              fileName,
              ...diffObject
            }
          }))
            .then(resolve)
            .catch(reject);
        });

    } catch (e) {
      reject(e);
    }
  });
}

async function getFileDiff(repoPath, branch, fileName) {
  const GET_DIFF_COMMAND = `git --no-pager diff ${branch}^! ${fileName}`;

  return new Promise((resolve, reject) => {
    try {
      const options = {cwd: repoPath};
      exec(GET_DIFF_COMMAND, options,
        function (error, stdout) {
          if (error !== null) {
            if (error instanceof RangeError) {
              resolve({diff: "This diff is too large", collapsed: true});
            }

            reject(error);
            return;
          }

          resolve({diff: stdout});
        });

    } catch (e) {
      reject(e);
    }
  });
}

function parseTreeLine(line) {
  const [modeTypeObject, name] = line.split('\t');
  const [mode, type, object] = modeTypeObject.split(' ');

  return {mode, type, object, name};
}

async function getTree(repoPath, branch, path) {
  const GET_TREE_COMMAND = `git --no-pager ls-tree ${branch} ${path}/`;

  return new Promise((resolve, reject) => {
    try {
      const options = {cwd: repoPath};
      exec(GET_TREE_COMMAND, options,
        function (error, stdout) {
          if (error !== null) {
            reject(error);
            return;
          }

          const tree = stdout.split(os.EOL).filter(fileName => !!fileName.trim()).map(parseTreeLine);
          resolve(tree);
        });

    } catch (e) {
      reject(e);
    }
  });
}

function getBlob(repoPath, branch, path) {
  const args = ['--no-pager', 'show', `${branch}:${path}`];
  const options = {cwd: repoPath};

  return spawn('git', args, options);
}

module.exports = {getRepos, cloneRepo, getCommits, getDiff, getTree, getBlob};
