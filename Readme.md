# retext-pos [![Build Status](https://img.shields.io/travis/wooorm/retext-pos.svg?style=flat)](https://travis-ci.org/wooorm/retext-pos) [![Coverage Status](https://img.shields.io/coveralls/wooorm/retext-pos.svg?style=flat)](https://coveralls.io/r/wooorm/retext-pos?branch=master)

**[Retext](https://github.com/wooorm/retext "Retext")** POS (part-of-speech) tagger using [dariusk/pos-js](https://github.com/dariusk/pos-js).

## Installation

npm:

```bash
$ npm install retext-pos
```

## Usage

```javascript
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

None, the plugin automatically detects the part-of-speech tag for each [`WordNode`](https://github.com/wooorm/textom/tree/master#textomwordnode-nlcstwordnode) (using [dariusk/pos-js](https://github.com/dariusk/pos-js)), and stores the tag in `node.data.partOfSpeech`.

## Performance

On a MacBook Air, **retext** performs about 49% slower with **retext-pos**.


```text
           retext w/o retext-pos
  181 op/s » A paragraph (5 sentences, 100 words)
   20 op/s » A section (10 paragraphs, 50 sentences, 1,000 words)

           retext w/ retext-pos
   91 op/s » A paragraph (5 sentences, 100 words)
    9 op/s » A section (10 paragraphs, 50 sentences, 1,000 words)
```

## License

MIT © [Titus Wormer](http://wooorm.com)
