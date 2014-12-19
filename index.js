#!/usr/bin/env node --harmony
"use strict";

let path = require('path')
  , fs = require('fs')
  , child_process = require('child_process')
  , argv = require('yargs').argv
  , traceur = require('traceur')
  , rc = require('rc')
  , _ = require('lodash')
  , defaultrc = JSON.parse(fs.readFileSync(__dirname + '/.traceurrc'))
  , tracuerConfig = _.omit(rc('traceur', defaultrc), ['config', '_'])
  , noopArgs = ['v', 'version', 'i', 'interactive', 'h', 'help', 'v8-options']
  , replArgs = ['e', 'eval', 'p', 'print']
  , evalArg
  , processArgv

// Don't transpile dependencies
function traceurFilter(filename) {
  return filename.indexOf('node_modules') === -1
}

// Display correct line numbers in error stack traces
require('traceur-source-maps').install(traceur);

// Set traceur compiler with options as default require()
traceur.require.makeDefault(traceurFilter, tracuerConfig)

if (_.any(noopArgs, _.has.bind(_, argv))) {
  return child_process.spawn('node', process.argv.slice(2), { stdio: 'inherit' })
}

// TODO: Pass --v8-options, --debug & --debug-brk
processArgv = _.pull(process.argv.slice(2), '--harmony', '--debug', '--debug-brk')
evalArg = []
for(let k in replArgs) {
  let v = replArgs[k]
  if (argv[v]) evalArg = ['-e', argv[v]]
}

if (!evalArg.length && processArgv.length) {
  require(path.resolve(process.cwd(), processArgv[0]))
} else {
  child_process.spawn('traceur-cli', evalArg, { stdio: 'inherit' })
}
