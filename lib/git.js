const exec = require('child_process').exec;
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

function parseCommitLine(line) {
  const [hash, created, author, ...message] = line.split('|');
  return {hash, created, author, message: message.join('|')};
}

module.exports = {getCommits};
