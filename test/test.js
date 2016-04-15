'use strict'

const test = require('tape')
const through2 = require('through2')
const fs = require('fs')
const resolve = require('path').resolve
const selfStream = require('../selfStream')

// file to change
const file = resolve('./test/', 'file.md')
// original string of 'a'
const aString = `aaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaa
bbbbbbbbbbbbbbbbbbbbbbbbbbb
aaaaaaaaaaaaaaaaaaaaaaaaaaa
aaaaaaaaaaaaaaaaaaaaaaaaaaa\n`
// new string of 'z'
const zString = `zzzzzzzzzzzzzzzzzzzzzzzzzzz
zzzzzzzzzzzzzzzzzzzzzzzzzzz
bbbbbbbbbbbbbbbbbbbbbbbbbbb
zzzzzzzzzzzzzzzzzzzzzzzzzzz
zzzzzzzzzzzzzzzzzzzzzzzzzzz\n`

// transform function
const transform = [through2(function (chunk, enc, cb) {
  for (let i = 0; i < chunk.length; i++) {
    if (chunk[i] === 97) chunk[i] = 122 // swap 'a' for 'z'
  }
  this.push(chunk)
  cb()
})]

test('Test', (t) => {
  t.plan(1)
  selfStream(file, transform, function (err) {
    if (err) return console.log(err)
    const modFile = fs.readFileSync(file, 'utf8')
    t.equal(modFile, zString, 'Swapped \'a\' to \'z\'')
    fs.writeFileSync(file, aString, 'utf8')
  })
})
