/*
 * Project: self-stream
 * Version: 1.0.0
 * Author: delvedor
 * Twitter: @delvedor
 * License: MIT
 * GitHub: https://github.com/delvedor/self-stream
 */

'use strict'

const fs = require('fs')
const pump = require('pump')

/**
 * Applies read/transform/write to the same file.
 * @param  {String}   file       [the file to change with the relative path]
 * @param  {Array}    transform  [array of functions with all the transforms]
 * @param  {Function} callback   [callback function]
 */
module.exports = function selfStream (file, transform, callback) {
  // creates a read stream to the file
  const readStream = fs.createReadStream(file)
  // creates a write stream to a tmp file
  const writeStream = fs.createWriteStream(`${file}.tmp`)

  pump(readStream, ...transform, writeStream, function pumpHandler (pumpErr) {
    if (pumpErr) return callback(pumpErr)
    // move the tmp file to the oroginal file by renaming it
    fs.rename(`${file}.tmp`, file, function renameHandler (renameErr) {
      callback(renameErr || null)
    })
  })
}
