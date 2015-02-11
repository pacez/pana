#!/usr/bin/env node
var ver='1.1.4-dev',
    program = require('commander'),
    fs=require('fs');

function clear(boole) {
  return boole;
}

function config(path) {
  return path;
}

program
  .version(ver)
  .usage('test case')
  .option('-C, --clear [Boolean]', '清理dump文件', 'false')
  .option('-c, --config [path]', '指定pana配置文件路径', '\pana-config.json')

console.log("======================================================");
console.log("TOOL NAME: pana");
console.log("AUTHOR: pace zhong");
console.log("VERSION: %s",ver);
console.log("======================================================");

program
  .command('sync')
  .description('同步服务器目录')
  .action(function() {
    var content = fs.readFileSync(program.config, 'utf8');
    console.log("=====================pana-config.json=================");
    console.log(content);
  });

program.parse(process.argv);

console.log("===========================Options====================");
console.log(' clear - %s ', program.clear);
console.log(' config - %s ', program.config);
