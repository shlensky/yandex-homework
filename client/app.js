const express = require('express');
const path = require('path');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

const diffLines = [
  {oldLine: 1,  newLine: 1,   operation: '',        text: 'package ru.yandex.devtools.intellij.arc.client;'},
  {oldLine: 2,  newLine: 2,   operation: '',        text: ''},
  {oldLine: 0,  newLine: 3,   operation: 'add',     text: 'import java.util.ArrayList;'},
  {oldLine: 0,  newLine: 4,   operation: 'add',     text: 'import java.util.Collection;'},
  {oldLine: 0,  newLine: 5,   operation: 'add',     text: 'import java.util.List;'},
  {oldLine: 0,  newLine: 6,   operation: 'add',     text: ''},
  {oldLine: 3,  newLine: 7,   operation: '',        text: 'import com.intellij.openapi.diagnostic.Logger;'},
  {oldLine: 0,  newLine: 8,   operation: 'add',     text: 'import com.intellij.openapi.project.Project;'},
  {oldLine: 4,  newLine: 9,   operation: '',        text: 'import com.intellij.openapi.vcs.FilePath;'},
  {oldLine: 5,  newLine: 10,  operation: '',        text: 'import com.intellij.openapi.vcs.VcsException;'},
  {oldLine: 6,  newLine: 11,  operation: '',        text: 'import com.intellij.openapi.vfs.VirtualFile;'},
  {oldLine: 7,  newLine: 12,  operation: '',        text: 'import com.intellij.vcsUtil.VcsUtil;'},
  {oldLine: 0,  newLine: 13,  operation: 'add',     text: 'import org.jetbrains.annotations.NotNull;'},
  {oldLine: 0,  newLine: 14,  operation: 'add',     text: ''},
  {oldLine: 8,  newLine: 15,  operation: '',        text: 'import ru.yandex.devtools.intellij.arc.ArcContext;'},
  {oldLine: 9,  newLine: 16,  operation: '',        text: 'import ru.yandex.devtools.intellij.arc.ArcRevisionNumber;'},
  {oldLine: 10, newLine: 17,  operation: '',        text: 'import ru.yandex.devtools.intellij.arc.ArcStatus;'},
  {oldLine: 0,  newLine: 18,  operation: 'add',     text: 'import ru.yandex.devtools.intellij.arc.ui.ArcResetDialog;'},
  {oldLine: 11, newLine: 19,  operation: 'add',     text: ''},
  {oldLine: 12, newLine: 0,   operation: 'remove',  text: 'import java.util.ArrayList;'},
  {oldLine: 13, newLine: 0,   operation: 'remove',  text: 'import java.util.Collection;'},
  {oldLine: 14, newLine: 0,   operation: 'remove',  text: 'import java.util.List;'},
  {oldLine: 15, newLine: 0,   operation: 'remove',  text: ''},
  {oldLine: 16, newLine: 20,  operation: '',        text: '/**'},
  {oldLine: 17, newLine: 21,  operation: '',        text: ' * @author Dmitry Andreev <a href="mailto:AndreevDm@yandex-team.ru"></a>'},
  {oldLine: 0,  newLine: 22,  operation: '',        text: ' * @date 11/10/2018'},
  {oldLine: 18, newLine: 23,  operation: '',        text: ' */'},
  {oldLine: 19, newLine: 24,  operation: '',        text: 'public ArcCli(String arcBinaryPath) {'},
  {oldLine: 20, newLine: 25,  operation: '',        text: '  this.arcBinaryPath = arcBinaryPath;'},
  {oldLine: 21, newLine: 26,  operation: '',        text: '}'},
];

const PAGES = [
  {name: 'files', title: 'Files', locals: {}},
  {name: 'branches', title: 'Branches', locals: {}},
  {name: 'file_view', title: 'File View', locals: {}},
  {name: 'file_history', title: 'File History', locals: {}},
  {name: 'commit', title: 'Commit', locals: {diffLines}},
  {name: 'readme', title: 'README.md', locals: {}}
];

PAGES.forEach(page => {
  app.get(`/${page.name}.html`, (req, res) => res.render(page.name, {title: page.title, ...page.locals}));
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
