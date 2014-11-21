# retext-pos [![Build Status](https://img.shields.io/travis/wooorm/retext-pos.svg?style=flat)](https://travis-ci.org/wooorm/retext-pos) [![Coverage Status](https://img.shields.io/coveralls/wooorm/retext-pos.svg?style=flat)](https://coveralls.io/r/wooorm/retext-pos?branch=master)

**[Retext](https://github.com/wooorm/retext "Retext")** POS (part-of-speech) tagger using [dariusk/pos-js](https://github.com/dariusk/pos-js).

## Installation

npm:
```sh
$ npm install retext-pos
```

## Usage

```js
var Retext = require('retext');
var visit = require('retext-visit');
var inspect = require('retext-inspect');
var pos = require('retext-pos');

var retext = new Retext()
    .use(visit)
    .use(inspect)
    .use(pos);

retext.parse(
    'I went to the store, to buy 5.2 gallons of milk.',
    function (err, tree) {
        tree.visit(tree.WORD_NODE, function (node) {
            console.log(node);
        });
        /**
         * WordNode[1] [data={"partOfSpeech":"NN"}]
         * └─ TextNode: 'I'
         *
         * WordNode[1] [data={"partOfSpeech":"VBD"}]
         * └─ TextNode: 'went'
         *
         * WordNode[1] [data={"partOfSpeech":"TO"}]
         * └─ TextNode: 'to'
         *
         * WordNode[1] [data={"partOfSpeech":"DT"}]
         * └─ TextNode: 'the'
         *
         * WordNode[1] [data={"partOfSpeech":"NN"}]
         * └─ TextNode: 'store'
         *
         * WordNode[1] [data={"partOfSpeech":"TO"}]
         * └─ TextNode: 'to'
         *
         * WordNode[1] [data={"partOfSpeech":"VB"}]
         * └─ TextNode: 'buy'
         *
         * WordNode[3] [data={"partOfSpeech":"CD"}]
         * ├─ TextNode: '5'
         * ├─ PunctuationNode: '.'
         * └─ TextNode: '2'
         *
         * WordNode[1] [data={"partOfSpeech":"NNS"}]
         * └─ TextNode: 'gallons'
         *
         * WordNode[1] [data={"partOfSpeech":"IN"}]
         * └─ TextNode: 'of'
         *
         * WordNode[1] [data={"partOfSpeech":"NN"}]
         * └─ TextNode: 'milk'
         */
    }
);
```

## API

None, the plugin automatically detects the part-of-speech tag of each word (using [dariusk/pos-js](https://github.com/dariusk/pos-js)), and stores the tag in `wordNode.data.partOfSpeech`.

## License

MIT © Titus Wormer
