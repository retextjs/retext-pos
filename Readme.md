# retext-pos [![Build Status](https://travis-ci.org/wooorm/retext-pos.svg?branch=master)](https://travis-ci.org/wooorm/retext-pos) [![Coverage Status](https://img.shields.io/coveralls/wooorm/retext-pos.svg)](https://coveralls.io/r/wooorm/retext-pos?branch=master)

**[Retext](https://github.com/wooorm/retext "Retext")** POS (part-of-speech) tagger using [dariusk/pos-js](https://github.com/dariusk/pos-js).

## Installation

npm:
```sh
$ npm install retext-pos
```

## Usage

```js
var Retext = require('retext'),
    visit = require('retext-visit'),
    pos = require('retext-pos'),
    retext;

retext = new Retext()
    .use(visit)
    .use(pos);

retext.parse(
    'I went to the store, to buy 5.2 gallons of milk.',
    function (err, tree) {
        tree.visitType(root.WORD_NODE, function (node) {
            console.log(node.toString(), node.data.partOfSpeech);
        });
        /**
         * 'I', 'NN'
         * 'went', 'VBD'
         * 'to', 'TO'
         * 'the', 'DT'
         * 'store', 'NN'
         * 'to', 'TO'
         * 'buy', 'VB'
         * '5.2', 'CD'
         * 'gallons', 'NNS'
         * 'of', 'IN'
         * 'milk', 'NN'
         */
    }
);
```

The example also uses [retext-visit](https://github.com/wooorm/retext-visit).

## API

None, the plugin automatically detects the part-of-speech tag of each word (using [dariusk/pos-js](https://github.com/dariusk/pos-js)) when it’s created or changed, and stores the tag in `wordNode.data.partOfSpeech`.

## License

MIT © Titus Wormer
