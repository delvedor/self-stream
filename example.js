'use strict'

const selfStream = require('./selfStream')
const through2 = require('through2')

// example with one transform function
const transform = through2(function (chunk, enc, cb) {
  for (var i = 0; i < chunk.length; i++) {
    if (chunk[i] === 97) chunk[i] = 122 // swap 'a' for 'z'
  }
  this.push(chunk)
  cb()
})

selfStream('test/file.md', transform, function (err) {
  if (err) return console.log(err)
})

// example with an array of transform functions
const transformArray = [through2(function (chunk, enc, cb) {
  for (let i = 0; i < chunk.length; i++) {
    if (chunk[i] === 97) chunk[i] = 122 // swap 'a' for 'z'
  }
  this.push(chunk)
  cb()
}), through2(function (chunk, enc, cb) {
  for (let i = 0; i < chunk.length; i++) {
    if (chunk[i] === 122) chunk[i] = 97 // swap 'z' for 'a'
  }
  this.push(chunk)
  cb()
})]

selfStream('test/file.md', transformArray, function (err) {
  if (err) return console.log(err)
})
