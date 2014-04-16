/*
 * grunt-docs
 * https://github.com/shama/grunt-docs
 *
 * Copyright (c) 2013 Kyle Robinson Young
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {
  'use strict';

  var docpad = require('docpad');
  var watchFull = ['server', 'watch', 'run'];

  function isWatch(action) {
    return action.split(/ +/).some(function(action) {
      return watchFull.indexOf(action) > -1;
    });
  }

  grunt.registerMultiTask('docpad', 'Compile with DocPad', function () {
    var done = this.async();
    var options = this.options({});
    var action = (this.data.action || 'generate');

    // To allow paths config to use patterns
    Object.keys(options).forEach(function (key) {
      if (key.slice(-5) === 'Paths') {
        options[key] = grunt.file.expand(options[key]);
      }
    });

    docpad.createInstance(options, function (err, inst) {
      if (err) {  return grunt.warn(err); }

      inst.action(action, function (err) {
        if (err) { return grunt.warn(err); }
        if (!isWatch(action)) {
          done();
        }
      });
    });
  });
};
