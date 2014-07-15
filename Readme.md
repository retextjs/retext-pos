# retext-pos [![Build Status](https://travis-ci.org/wooorm/retext-pos.svg?branch=master)](https://travis-ci.org/wooorm/retext-pos) [![Coverage Status](https://img.shields.io/coveralls/wooorm/retext-pos.svg)](https://coveralls.io/r/wooorm/retext-pos?branch=master)

[![browser support](https://ci.testling.com/wooorm/retext-pos.png) ](https://ci.testling.com/wooorm/retext-pos)

---

**[Retext](https://github.com/wooorm/retext "Retext")** POS (part-of-speech) tagger using [dariusk/pos-js](https://github.com/dariusk/pos-js).

## Installation

NPM:
```sh
$ npm install retext-pos
```

Component.js:
```sh
$ component install wooorm/retext-pos
```

## Usage

```js
var Retext = require('retext'),
    visit = require('retext-visit'),
    pos = require('retext-pos');

var root = new Retext()
    .use(visit)
    .use(pos)
    .parse('A simple english sentence.');

root.visitType(root.WORD_NODE, function (node) {
    console.log(node.toString(), node.data.partOfSpeech);
});
// 'A', 'DT'
// 'simple', 'JJ'
// 'english', 'NN'
// 'sentence', 'NN'
```

Both examples also uses [retext-visit](https://github.com/wooorm/retext-visit).

## API
None, the plugin automatically detects the part-of-speech tag of each word (using [dariusk/pos-js](https://github.com/dariusk/pos-js)) when its created or changed, and stores the tag in `wordNode.data.partOfSpeech`.

## License

  MIT
