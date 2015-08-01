# retext-pos [![Build Status](https://img.shields.io/travis/wooorm/retext-pos.svg)](https://travis-ci.org/wooorm/retext-pos) [![Coverage Status](https://img.shields.io/codecov/c/github/wooorm/retext-pos.svg)](https://codecov.io/github/wooorm/retext-pos)

[**Retext**](https://github.com/wooorm/retext) implementation of the
[Metaphone](http://en.wikipedia.org/wiki/Metaphone) algorithm.

[**Retext**](https://github.com/wooorm/retext) part-of-speech (POS) tagger.

## Installation

[npm](https://docs.npmjs.com/cli/install):

```bash
npm install retext-pos
```

**retext-pos** is also available for [bower](http://bower.io/#install-packages),
[component](https://github.com/componentjs/component), and
[duo](http://duojs.org/#getting-started), and as an AMD, CommonJS, and globals
module, [uncompressed](retext-pos.js) and
[compressed](retext-pos.min.js).

## Usage

```javascript
var retext = require('retext');
var inspect = require('unist-util-inspect');
var pos = require('retext-pos');

retext().use(pos).use(function () {
    return function (cst) {
        console.log(inspect(cst));
    };
}).process('I went to the store, to buy 5.2 gallons of milk.');
```

Yields:

```text
RootNode[1]
└─ ParagraphNode[1]
   └─ SentenceNode[23]
      ├─ WordNode[1] [data={"partOfSpeech":"NN"}]
      │  └─ TextNode: 'I'
      ├─ WhiteSpaceNode: ' '
      ├─ WordNode[1] [data={"partOfSpeech":"VBD"}]
      │  └─ TextNode: 'went'
      ├─ WhiteSpaceNode: ' '
      ├─ WordNode[1] [data={"partOfSpeech":"TO"}]
      │  └─ TextNode: 'to'
      ├─ WhiteSpaceNode: ' '
      ├─ WordNode[1] [data={"partOfSpeech":"DT"}]
      │  └─ TextNode: 'the'
      ├─ WhiteSpaceNode: ' '
      ├─ WordNode[1] [data={"partOfSpeech":"NN"}]
      │  └─ TextNode: 'store'
      ├─ PunctuationNode: ','
      ├─ WhiteSpaceNode: ' '
      ├─ WordNode[1] [data={"partOfSpeech":"TO"}]
      │  └─ TextNode: 'to'
      ├─ WhiteSpaceNode: ' '
      ├─ WordNode[1] [data={"partOfSpeech":"VB"}]
      │  └─ TextNode: 'buy'
      ├─ WhiteSpaceNode: ' '
      ├─ WordNode[3] [data={"partOfSpeech":"CD"}]
      │  ├─ TextNode: '5'
      │  ├─ PunctuationNode: '.'
      │  └─ TextNode: '2'
      ├─ WhiteSpaceNode: ' '
      ├─ WordNode[1] [data={"partOfSpeech":"NNS"}]
      │  └─ TextNode: 'gallons'
      ├─ WhiteSpaceNode: ' '
      ├─ WordNode[1] [data={"partOfSpeech":"IN"}]
      │  └─ TextNode: 'of'
      ├─ WhiteSpaceNode: ' '
      ├─ WordNode[1] [data={"partOfSpeech":"NN"}]
      │  └─ TextNode: 'milk'
      └─ PunctuationNode: '.'
```

## API

None, the plugin automatically detects the part-of-speech tag for each
[`WordNode`](https://github.com/wooorm/nlcst#wordnode) (using
[**dariusk/pos-js**](https://github.com/dariusk/pos-js)), and stores the tags
in `node.data.partOfSpeech`.

## License

[MIT](LICENSE) © [Titus Wormer](http://wooorm.com)
