const {exec} = require('child_process');
const os = require('os');

async function getCommits(path, branch) {
  const GET_COMMITS_COMMAND = `git --no-pager log --pretty=format:"%H|%ad|%an|%s" --no-decorate --date=iso ${branch}`;

  return new Promise((resolve, reject) => {
    try {
      const options = {cwd: path};
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

async function getDiff(path, branch) {
  const GET_CHANGED_FILES_COMMAND = `git --no-pager diff --name-status ${branch}^!`;

  return new Promise(async (resolve, reject) => {
    try {
      const options = {cwd: path};
      exec(GET_CHANGED_FILES_COMMAND, options,
        async function (error, stdout) {
          if (error !== null) {
            reject(error);
            return;
          }

          const changedFiles = stdout.split(os.EOL).filter(fileName => !!fileName.trim());

          Promise.all(changedFiles.map(async (fileNameWithStatus) => {
            const [status, fileName] = fileNameWithStatus.split("\t");

            const diffObject = status === 'D' ? {} : await getFileDiff(path, branch, fileName);

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

async function getFileDiff(path, branch, fileName) {
  const GET_DIFF_COMMAND = `git --no-pager diff ${branch}^! ${fileName}`;

  return new Promise((resolve, reject) => {
    try {
      const options = {cwd: path};
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

function parseCommitLine(line) {
  const [hash, created, author, ...message] = line.split('|');
  return {hash, created, author, message: message.join('|')};
}

module.exports = {getCommits, getDiff};
