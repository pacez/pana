#!/usr/bin/env node
var ver='0.0.1-beta',
    program = require('commander'),
    watch = require('./bin/pana-watch.js'),
    fs=require('fs');

function clear(boole) {
  return boole;
}

function config(path) {
  return path;
}

function outToolInfo(){
  console.log("======================================================");
  console.log("TOOL NAME: pana");
  console.log("AUTHOR: pace zhong");
  console.log("VERSION: %s",ver);
  console.log("======================================================");
}

program
  .version(ver)
  .usage('test case')
  .option('-C, --clear [Boolean]', '清理dump文件', 'false')
  .option('-c, --config [path]', '指定pana配置文件路径', '\pana-config.json');

program
  .command('ftp-sync')
  .description('同步服务器目录')
  .action(function() {
    outToolInfo()
    watch('**/*');
    console.log("Watching... CTRl+C Stop");
  });

program.parse(process.argv);
if (!process.argv.slice(2).length) {
    program.outputHelp();
}
