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
  {oldLine: 0,  newLine: 3,   operation: 'add',     text: '<span class="JavaSyntax-Keyword">import</span> java.util.ArrayList;'},
  {oldLine: 0,  newLine: 4,   operation: 'add',     text: '<span class="JavaSyntax-Keyword">import</span> java.util.Collection;'},
  {oldLine: 0,  newLine: 5,   operation: 'add',     text: '<span class="JavaSyntax-Keyword">import</span> java.util.List;'},
  {oldLine: 0,  newLine: 6,   operation: 'add',     text: ''},
  {oldLine: 3,  newLine: 7,   operation: '',        text: '<span class="JavaSyntax-Keyword">import</span> com.intellij.openapi.diagnostic.Logger;'},
  {oldLine: 0,  newLine: 8,   operation: 'add',     text: '<span class="JavaSyntax-Keyword">import</span> com.intellij.openapi.project.Project;'},
  {oldLine: 4,  newLine: 9,   operation: '',        text: '<span class="JavaSyntax-Keyword">import</span> com.intellij.openapi.vcs.FilePath;'},
  {oldLine: 5,  newLine: 10,  operation: '',        text: '<span class="JavaSyntax-Keyword">import</span> com.intellij.openapi.vcs.VcsException;'},
  {oldLine: 6,  newLine: 11,  operation: '',        text: '<span class="JavaSyntax-Keyword">import</span> com.intellij.openapi.vfs.VirtualFile;'},
  {oldLine: 7,  newLine: 12,  operation: '',        text: '<span class="JavaSyntax-Keyword">import</span> com.intellij.vcsUtil.VcsUtil;'},
  {oldLine: 0,  newLine: 13,  operation: 'add',     text: '<span class="JavaSyntax-Keyword">import</span> org.jetbrains.annotations.NotNull;'},
  {oldLine: 0,  newLine: 14,  operation: 'add',     text: ''},
  {oldLine: 8,  newLine: 15,  operation: '',        text: '<span class="JavaSyntax-Keyword">import</span> ru.yandex.devtools.intellij.arc.ArcContext;'},
  {oldLine: 9,  newLine: 16,  operation: '',        text: '<span class="JavaSyntax-Keyword">import</span> ru.yandex.devtools.intellij.arc.ArcRevisionNumber;'},
  {oldLine: 10, newLine: 17,  operation: '',        text: '<span class="JavaSyntax-Keyword">import</span> ru.yandex.devtools.intellij.arc.ArcStatus;'},
  {oldLine: 0,  newLine: 18,  operation: 'add',     text: '<span class="JavaSyntax-Keyword">import</span> ru.yandex.devtools.intellij.arc.ui.ArcResetDialog;'},
  {oldLine: 11, newLine: 19,  operation: 'add',     text: ''},
  {oldLine: 12, newLine: 0,   operation: 'remove',  text: '<span class="JavaSyntax-Keyword">import</span> java.util.ArrayList;'},
  {oldLine: 13, newLine: 0,   operation: 'remove',  text: '<span class="JavaSyntax-Keyword">import</span> java.util.Collection;'},
  {oldLine: 14, newLine: 0,   operation: 'remove',  text: '<span class="JavaSyntax-Keyword">import</span> java.util.List;'},
  {oldLine: 15, newLine: 0,   operation: 'remove',  text: ''},
  {oldLine: 16, newLine: 20,  operation: '',        text: '<span class="JavaSyntax-Comment">/**</span>'},
  {oldLine: 17, newLine: 21,  operation: '',        text: '<span class="JavaSyntax-Comment"> * @author Dmitry Andreev &lt;a href="mailto:AndreevDm@yandex-team.ru"&gt;&lt;/a&gt;</span>'},
  {oldLine: 0,  newLine: 22,  operation: '',        text: '<span class="JavaSyntax-Comment"> * @date 11/10/2018</span>'},
  {oldLine: 18, newLine: 23,  operation: '',        text: '<span class="JavaSyntax-Comment"> */</span>'},
  {oldLine: 19, newLine: 24,  operation: '',        text: '<span class="JavaSyntax-Keyword">public</span> <span class="JavaSyntax-Function">ArcCli</span>(<span class="JavaSyntax-Builtin">String</span> arcBinaryPath) {'},
  {oldLine: 20, newLine: 25,  operation: '',        text: '  this.arcBinaryPath = arcBinaryPath;'},
  {oldLine: 21, newLine: 26,  operation: '',        text: '}'},
];

const fileViewLines = [
  "<span class='PythonSyntax-Comment'>#!/usr/bin/env python</span>",
  "<span class='PythonSyntax-Keyword'>import</span> os",
  "<span class='PythonSyntax-Keyword'>import</span> sys",
  "<span class='PythonSyntax-Keyword'>import</span> platform",
  "<span class='PythonSyntax-Keyword'>import</span> json",
  "",
  "URLS = [<span class='PythonSyntax-Literal'>'https://proxy.sandbox.yandex-team.ru/453818264'</span>, <span class='PythonSyntax-Literal'>'http://storage-int.mds.yandex.net/get-sandbox/110738/by_platform.json.453815347'</span>]",
  "MD5 = <span class='PythonSyntax-Literal'>'7f5a85f9c28d35c3a76d8cea7af51106'</span>",
  "",
  "RETRIES = 5",
  "HASH_PREFIX = 10",
  "",
  "HOME_DIR = os.path.expanduser(<span class='PythonSyntax-Literal'>'~'</span>)",
  "",
  "",
  "<span class='PythonSyntax-Keyword'>def</span> <span class='PythonSyntax-Function'>create_dirs</span>(path):",
  "    <span class='PythonSyntax-Keyword'>try</span>:",
  "        os.makedirs(path)",
  "    <span class='PythonSyntax-Keyword'>except</span> OSError <span class='PythonSyntax-Keyword'>as</span> e:",
  "        <span class='PythonSyntax-Keyword'>import</span> errno",
  "",
  "        <span class='PythonSyntax-Keyword'>if</span> e.errno != errno.EEXIST:",
  "            <span class='PythonSyntax-Keyword'>raise</span>",
  "",
  "    <span class='PythonSyntax-Keyword'>return</span> path",
  "",
  "",
  "<span class='PythonSyntax-Keyword'>def</span> <span class='PythonSyntax-Function'>misc_root</span>():",
  "    <span class='PythonSyntax-Keyword'>return</span> create_dirs(os.getenv(<span class='PythonSyntax-Literal'>'YA_CACHE_DIR'</span>) or os.path.join(HOME_DIR, <span class='PythonSyntax-Literal'>'.ya'</span>))",
  "",
  "",
  "<span class='PythonSyntax-Keyword'>def</span> <span class='PythonSyntax-Function'>tool_root</span>():",
  "",
  "",
  "    <span class='PythonSyntax-Keyword'>def</span> <span class='PythonSyntax-Function'>create_dirs</span>(path):",
  "        <span class='PythonSyntax-Keyword'>try</span>:",
  "            os.makedirs(path)",
  "        <span class='PythonSyntax-Keyword'>except</span> OSError <span class='PythonSyntax-Keyword'>as</span> e:",
  "            <span class='PythonSyntax-Keyword'>import</span> errno",
  "",
  "            <span class='PythonSyntax-Keyword'>if</span> e.errno != errno.EEXIST:",
  "                <span class='PythonSyntax-Keyword'>raise</span>",
  "",
  "        <span class='PythonSyntax-Keyword'>return</span> path"
];

const branches = [
  {name: 'trunk', hash: '6748ds893432438dsd823329d923482d'},
  {name: 'users/a-aidyn00/my-feature-2', hash: '7748ds893432438dsd823329d923482d'},
  {name: 'users/a-aidyn00/my-feature-3', hash: '8748ds893432438dsd823329d923482d'},
  {name: 'users/a-aidyn00/my-feature-5', hash: '9748ds893432438dsd823329d923482d'},
  {name: 'users/a-aidyn00/my-feature-6', hash: '1748ds893432438dsd823329d923482d'},
  {name: 'users/a-aidyn00/my-feature-7', hash: '2748ds893432438dsd823329d923482d'},
  {name: 'users/a-aidyn00/my-feature-8', hash: '3748ds893432438dsd823329d923482d'},
  {name: 'users/a-aidyn00/my-feature-9', hash: '4748ds893432438dsd823329d923482d'},
  {name: 'users/a-aidyn00/my-feature-10', hash: '5748ds893432438dsd823329d923482d'},
  {name: 'users/a-aidyn00/my-feature-11', hash: '4548ds893432438dsd823329d923482d'},
  {name: 'users/a-aidyn00/my-feature-12', hash: '3248ds893432438dsd823329d923482d'},
  {name: 'users/a-aidyn00/my-feature-13', hash: '1348ds893432438dsd823329d923482d'},
];

const files = [
  {
    icon: 'folder',
    name: 'api',
    commit: 'd53dsv',
    message: '[vcs] move http to arc',
    author: 'noxoomo',
    date: '4 s ago'
  },
  {
    icon: 'folder',
    name: 'ci',
    commit: 'c53dsv',
    message: '[vcs] test for empty commit message',
    author: 'nikitxskv',
    date: '1 min ago'
  },
  {
    icon: 'folder',
    name: 'contrib',
    commit: 's53dsv',
    message: '[vcs] change owner to g:arc',
    author: 'nalpp',
    date: '16:25'
  },
  {
    icon: 'folder',
    name: 'http',
    commit: 'h5jdsv',
    message: '[vcs] move http to arc',
    author: 'somov',
    date: 'Yesterday, 14:50'
  },
  {
    icon: 'folder',
    name: 'lib',
    commit: 'f5jdsv',
    message: '<a class="Link" href="#">ARCADIA-771</a>: append /trunk/arcadia/',
    author: 'deshevoy',
    date: 'Jan 11, 12:01'
  },
  {
    icon: 'folder',
    name: 'local',
    commit: 'k5jdsv',
    message: '<a class="Link" href="#">ARCADIA-771</a>: detect binary files',
    author: 'exprmntr',
    date: 'Jan 10, 12:01'
  },
  {
    icon: 'folder',
    name: 'packages',
    commit: 'k5jdsv',
    message: '[vcs] <a class="Link" href="#">VCS-803</a>: packages for services',
    author: 'levanov',
    date: 'Jan 1, 12:01'
  },
  {
    icon: 'folder',
    name: 'robots',
    commit: 'l5jdsv',
    message: '<a class="Link" href="#">ARCADIA-771</a>: convert string to json object',
    author: 'torkve',
    date: 'Dec 29, 2017'
  },
  {
    icon: 'folder',
    name: 'server',
    commit: 'j5jdsv',
    message: '[vcs] get list of refs',
    author: 'spreis',
    date: 'Dec 29, 2017'
  },
  {
    icon: 'folder',
    name: 'ut',
    commit: 'j5jdsv',
    message: '[vsc] store merge conflicts',
    author: 'annaveronika',
    date: 'Dec 29, 2017'
  },
  {
    icon: 'text_file',
    name: 'README.md',
    commit: 'h5jdsl',
    message: '[vcs] add readme',
    author: 'pg',
    date: 'Dec 29, 2017',
    href: 'readme.html'
  },
  {
    icon: 'code_file',
    name: 'ya.make',
    commit: 'k5jdsv',
    message: '[vcs] move http to arc',
    author: 'mvel',
    date: 'Dec 29, 2017',
    href: 'file_view.html'
  },
];

const filesForReadme = [
  {
    icon: 'folder',
    name: 'events',
    commit: 'r3248719',
    message: '[vcs] move http to arc',
    author: 'noxoomo',
    date: '4 s ago'
  },
  {
    icon: 'folder',
    name: 'idm',
    commit: 'r2899268',
    message: '[vcs] test for empty commit message',
    author: 'nikitxskv',
    date: '1 min ago'
  },
  {
    icon: 'folder',
    name: 'samogon',
    commit: 'r3012807',
    message: '[vcs] change owner to g:arc',
    author: 'nalpp',
    date: '16:25'
  },
  {
    icon: 'folder',
    name: 'server',
    commit: 'r3248802',
    message: '[vcs] move http to arc',
    author: 'somov',
    date: 'Yesterday, 14:50'
  },
  {
    icon: 'folder',
    name: 'yardman',
    commit: 'r2090562',
    message: '<a class="Link" href="#">ARCADIA-771</a>: append /trunk/arcadia/',
    author: 'deshevoy',
    date: 'Jan 11, 12:01'
  },
  {
    icon: 'text_file',
    name: 'READMEmd',
    commit: 'r2168860',
    message: '<a class="Link" href="#">ARCADIA-771</a>: detect binary files',
    author: 'exprmntr',
    date: 'Jan 10, 12:01',
    href: 'readme.html'
  },
  {
    icon: 'code_file',
    name: 'yamake',
    commit: 'r2778241',
    message: '[vcs] <a class="Link" href="#">VCS-803</a>: packages for services',
    author: 'levanov',
    date: 'Jan 1, 12:01',
    href: 'file_view.html'
  },
];

const pages = [
  {name: 'files', title: 'Files', locals: {files}},
  {name: 'branches', title: 'Branches', locals: {branches}},
  {name: 'file_view', title: 'File View', locals: {fileViewLines}},
  {name: 'file_history', title: 'File History', locals: {}},
  {name: 'commit', title: 'Commit', locals: {diffLines}},
  {name: 'readme', title: 'README.md', locals: {files: filesForReadme}}
];

pages.forEach(page => {
  app.get(`/${page.name}.html`, (req, res) => res.render(page.name, {title: page.title, ...page.locals}));
});


const port = 3001;
app.listen(port, () => {
  console.info(`Listening on port ${port}!`);
  console.info(`-------`);
  console.info(`Links to the pages:`);

  pages.forEach(page => {
    console.info(`http://localhost:3001/${page.name}.html - ${page.title}`);
  });
});

module.exports = app;
