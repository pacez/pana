var path = require('path'),
    gaze = require('gaze'),
    ftp = require('./pana-ftp.js');


module.exports = function(path) {
  'use strict';
  console.log("Watching... CTRl+C Stop");
  gaze(path, function(err, watcher) {
    this.on('all', function(event, filepath) {
      console.log(filepath + ' was ' + event);
      ftp(filepath);
      console.log("Watching... CTRl+C Stop");
    });
  });
};
