# retext-pos [![Build Status][travis-badge]][travis] [![Coverage Status][codecov-badge]][codecov]

Part-of-speech (POS) tagger for [**retext**][retext].

## Installation

[npm][]:

```bash
npm install retext-pos
```

## Usage

```javascript
var retext = require('retext');
var inspect = require('unist-util-inspect');
var pos = require('retext-pos');

retext()
  .use(pos)
  .use(function () {
    return transformer;
    function transformer(tree) {
      console.log(inspect(tree));
    }
  })
  .process('I went to the store, to buy 5.2 gallons of milk.');
```

Yields:

```text
RootNode[1] (1:1-1:49, 0-48)
└─ ParagraphNode[1] (1:1-1:49, 0-48)
   └─ SentenceNode[23] (1:1-1:49, 0-48)
      ├─ WordNode[1] (1:1-1:2, 0-1) [data={"partOfSpeech":"PRP"}]
      │  └─ TextNode: "I" (1:1-1:2, 0-1)
      ├─ WhiteSpaceNode: " " (1:2-1:3, 1-2)
      ├─ WordNode[1] (1:3-1:7, 2-6) [data={"partOfSpeech":"VBD"}]
      │  └─ TextNode: "went" (1:3-1:7, 2-6)
      ├─ WhiteSpaceNode: " " (1:7-1:8, 6-7)
      ├─ WordNode[1] (1:8-1:10, 7-9) [data={"partOfSpeech":"TO"}]
      │  └─ TextNode: "to" (1:8-1:10, 7-9)
      ├─ WhiteSpaceNode: " " (1:10-1:11, 9-10)
      ├─ WordNode[1] (1:11-1:14, 10-13) [data={"partOfSpeech":"DT"}]
      │  └─ TextNode: "the" (1:11-1:14, 10-13)
      ├─ WhiteSpaceNode: " " (1:14-1:15, 13-14)
      ├─ WordNode[1] (1:15-1:20, 14-19) [data={"partOfSpeech":"NN"}]
      │  └─ TextNode: "store" (1:15-1:20, 14-19)
      ├─ PunctuationNode: "," (1:20-1:21, 19-20)
      ├─ WhiteSpaceNode: " " (1:21-1:22, 20-21)
      ├─ WordNode[1] (1:22-1:24, 21-23) [data={"partOfSpeech":"TO"}]
      │  └─ TextNode: "to" (1:22-1:24, 21-23)
      ├─ WhiteSpaceNode: " " (1:24-1:25, 23-24)
      ├─ WordNode[1] (1:25-1:28, 24-27) [data={"partOfSpeech":"VB"}]
      │  └─ TextNode: "buy" (1:25-1:28, 24-27)
      ├─ WhiteSpaceNode: " " (1:28-1:29, 27-28)
      ├─ WordNode[3] (1:29-1:32, 28-31) [data={"partOfSpeech":"CD"}]
      │  ├─ TextNode: "5" (1:29-1:30, 28-29)
      │  ├─ PunctuationNode: "." (1:30-1:31, 29-30)
      │  └─ TextNode: "2" (1:31-1:32, 30-31)
      ├─ WhiteSpaceNode: " " (1:32-1:33, 31-32)
      ├─ WordNode[1] (1:33-1:40, 32-39) [data={"partOfSpeech":"NNS"}]
      │  └─ TextNode: "gallons" (1:33-1:40, 32-39)
      ├─ WhiteSpaceNode: " " (1:40-1:41, 39-40)
      ├─ WordNode[1] (1:41-1:43, 40-42) [data={"partOfSpeech":"IN"}]
      │  └─ TextNode: "of" (1:41-1:43, 40-42)
      ├─ WhiteSpaceNode: " " (1:43-1:44, 42-43)
      ├─ WordNode[1] (1:44-1:48, 43-47) [data={"partOfSpeech":"NN"}]
      │  └─ TextNode: "milk" (1:44-1:48, 43-47)
      └─ PunctuationNode: "." (1:48-1:49, 47-48)
```

## API

### `retext().use(pos)`

None, the plugin automatically detects the part-of-speech tag for each
[`WordNode`][word] (using [`dariusk/pos-js`][posjs]), and stores the tags
in `node.data.partOfSpeech`.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/wooorm/retext-pos.svg

[travis]: https://travis-ci.org/wooorm/retext-pos

[codecov-badge]: https://img.shields.io/codecov/c/github/wooorm/retext-pos.svg

[codecov]: https://codecov.io/github/wooorm/retext-pos

[npm]: https://docs.npmjs.com/cli/install

[license]: LICENSE

[author]: http://wooorm.com

[retext]: https://github.com/wooorm/retext

[word]: https://github.com/wooorm/nlcst#word

[posjs]: https://github.com/dariusk/pos-js
