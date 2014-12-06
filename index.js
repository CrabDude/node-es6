#!/usr/bin/env node --harmony
"use strict";

let path = require('path')
  , fs = require('fs')
  , argv = require('yargs').argv._
  , traceur = require('traceur')
  , rc = require('rc')
  , _ = require('lodash')
  , defaultrc = JSON.parse(fs.readFileSync(__dirname + '/.traceurrc'))
  , tracuerConfig = _.omit(rc('traceur', defaultrc), ['config', '_'])

// Don't transpile dependencies
function traceurFilter(filename) {
	return filename.indexOf('node_modules') === -1
}

// Display correct line numbers in error stack traces
require('traceur-source-maps').install(traceur);

// Set traceur compiler with options as default require()
traceur.require.makeDefault(traceurFilter, tracuerConfig)

require(path.resolve(process.cwd(), argv[0]))
