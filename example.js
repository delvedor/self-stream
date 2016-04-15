'use strict'

const selfStream = require('./selfStream')
const through2 = require('through2')

const transform = [through2(function (chunk, enc, cb) {
  for (var i = 0; i < chunk.length; i++) {
    if (chunk[i] === 97) chunk[i] = 122 // swap 'a' for 'z'
  }
  this.push(chunk)
  cb()
})]

selfStream('test/file.md', transform, function (err) {
  if (err) return console.log(err)
})
