# retext-pos

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

[**retext**][retext] plugin to add part-of-speech (POS) tags.

Useful for other plugins as it adds information to [**nlcst**][nlcst] nodes.

## Install

[npm][]:

```sh
npm install retext-pos
```

## Use

```js
var retext = require('retext')
var inspect = require('unist-util-inspect')
var pos = require('retext-pos')

retext()
  .use(pos)
  .use(plugin)
  .process('I went to the store, to buy 5.2 gallons of milk.', function (err) {
    if (err) {
      throw err;
    }
  })

function plugin() {
  return transformer
  function transformer(tree) {
    console.log(inspect(tree))
  }
}
```

Yields:

```txt
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

Add part-of-speech (POS) tags to [**word**][word]s using
[`dariusk/pos-js`][posjs] at `node.data.partOfSpeech`.

## Contribute

See [`contributing.md`][contributing] in [`retextjs/.github`][health] for ways
to get started.
See [`support.md`][support] for ways to get help.

This project has a [Code of Conduct][coc].
By interacting with this repository, organisation, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://img.shields.io/travis/retextjs/retext-pos.svg

[build]: https://travis-ci.org/retextjs/retext-pos

[coverage-badge]: https://img.shields.io/codecov/c/github/retextjs/retext-pos.svg

[coverage]: https://codecov.io/github/retextjs/retext-pos

[downloads-badge]: https://img.shields.io/npm/dm/retext-pos.svg

[downloads]: https://www.npmjs.com/package/retext-pos

[size-badge]: https://img.shields.io/bundlephobia/minzip/retext-pos.svg

[size]: https://bundlephobia.com/result?p=retext-pos

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/join%20the%20community-on%20spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/retext

[npm]: https://docs.npmjs.com/cli/install

[health]: https://github.com/retextjs/.github

[contributing]: https://github.com/retextjs/.github/blob/master/contributing.md

[support]: https://github.com/retextjs/.github/blob/master/support.md

[coc]: https://github.com/retextjs/.github/blob/master/code-of-conduct.md

[license]: license

[author]: https://wooorm.com

[retext]: https://github.com/retextjs/retext

[nlcst]: https://github.com/syntax-tree/nlcst

[word]: https://github.com/syntax-tree/nlcst#word

[posjs]: https://github.com/dariusk/pos-js
