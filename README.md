# self-stream
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](http://standardjs.com/)

Sometimes you need to change something in a file and probably you will do:
```javascript
const fs = require('fs')
fs.readFile('file.md', 'utf8', (readErr, data) => {
  if (readErr) return console.log(readErr)
  data = changeSomething(data)
  fs.writeFile('file.md', 'utf8', (writeErr) => {
    if (writeErr) return console.log(writeErr)
    console.log('done')
  })
})
```
And that's not a good thing, because you are loading the entire file in your working memory slowing down your application.  
In the magic world of Nodejs for avoid this problem you can use streams.
But as you probably know with streams you cannot read, transform and write the same file.  
Here come to help **self-stream**, an "hack" solution to this problem.

## Install
```
$ npm install self-stream --save
```
## API

#### selfStream(filename, transform, callback)
*filename*: the file to change with the relative path  
*transform*: array of functions with all the transforms  
*callback*: callback function  

### Example:
```javascript
const selfStream = require('self-stream')
const through2 = require('through2')

// transform is an array
const transform = [through2(function (chunk, enc, cb) {
  for (var i = 0; i < chunk.length; i++) {
    if (chunk[i] === 97) chunk[i] = 122 // swap 'a' for 'z'
  }
  this.push(chunk)
  cb()
})]

selfStream('file.md', transform, function (err) {
  if (err) return console.log(err)
})

```

As you can see in the [source code](https://github.com/delvedor/self-stream/blob/master/selfStream.js) self-stream uses pump to pipe all the streams and at the end it will rewrite the original file with the modified one.

## Contributing
If you feel you can help in any way, be it with examples, extra testing, or new features please open a pull request or open an issue.

The code follows the Standard code style.  
[![js-standard-style](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)
______________________________________________________________________________________________________________________
## License
The code is released under the MIT license.

The software is provided "as is", without warranty of any kind, express or implied, including but not limited to the warranties of merchantability, fitness for a particular purpose and non infringement. In no event shall the authors or copyright holders be liable for any claim, damages or other liability, whether in an action of contract, tort or otherwise, arising from, out of or in connection with the software or the use or other dealings in the software.
