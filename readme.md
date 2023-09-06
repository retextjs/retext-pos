# retext-pos

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

**[retext][]** plugin to add POS (part of speech) tags to words.

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`unified().use(retextPos)`](#unifieduseretextpos)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Contribute](#contribute)
*   [License](#license)

## What is this?

This package is a [unified][] ([retext][]) plugin to add part of speech tags
to words.
It uses [`dariusk/pos-js`][posjs] and adds `node.data.partOfSpeech` on
[`Word`][nlcst-word] nodes.
It works by checking each sentence, so its smarter that just passing one word
through.

## When should I use this?

You can either use this plugin if another plugin, or your own plugin, needs
POS tags!

## Install

This package is [ESM only][esm].
In Node.js (version 16+), install with [npm][]:

```sh
npm install retext-pos
```

In Deno with [`esm.sh`][esmsh]:

```js
import retextPos from 'https://esm.sh/retext-pos@4'
```

In browsers with [`esm.sh`][esmsh]:

```html
<script type="module">
  import retextPos from 'https://esm.sh/retext-pos@4?bundle'
</script>
```

## Use

```js
/**
 * @typedef {import('nlcst').Root} Root
 */

import {retext} from 'retext'
import retextPos from 'retext-pos'
import {inspect} from 'unist-util-inspect'

await retext()
  .use(retextPos)
  .use(myRetextPlugin)
  .process('I went to the store, to buy 5.2 gallons of milk.')

function myRetextPlugin() {
  /**
   * @param {Root} tree
   */
  return function (tree) {
    console.log(inspect(tree))
  }
}
```

Yields:

```txt
RootNode[1] (1:1-1:49, 0-48)
└─0 ParagraphNode[1] (1:1-1:49, 0-48)
    └─0 SentenceNode[23] (1:1-1:49, 0-48)
        ├─0  WordNode[1] (1:1-1:2, 0-1)
        │    │ data: {"partOfSpeech":"PRP"}
        │    └─0 TextNode "I" (1:1-1:2, 0-1)
        ├─1  WhiteSpaceNode " " (1:2-1:3, 1-2)
        ├─2  WordNode[1] (1:3-1:7, 2-6)
        │    │ data: {"partOfSpeech":"VBD"}
        │    └─0 TextNode "went" (1:3-1:7, 2-6)
        ├─3  WhiteSpaceNode " " (1:7-1:8, 6-7)
        ├─4  WordNode[1] (1:8-1:10, 7-9)
        │    │ data: {"partOfSpeech":"TO"}
        │    └─0 TextNode "to" (1:8-1:10, 7-9)
        ├─5  WhiteSpaceNode " " (1:10-1:11, 9-10)
        ├─6  WordNode[1] (1:11-1:14, 10-13)
        │    │ data: {"partOfSpeech":"DT"}
        │    └─0 TextNode "the" (1:11-1:14, 10-13)
        ├─7  WhiteSpaceNode " " (1:14-1:15, 13-14)
        ├─8  WordNode[1] (1:15-1:20, 14-19)
        │    │ data: {"partOfSpeech":"NN"}
        │    └─0 TextNode "store" (1:15-1:20, 14-19)
        ├─9  PunctuationNode "," (1:20-1:21, 19-20)
        ├─10 WhiteSpaceNode " " (1:21-1:22, 20-21)
        ├─11 WordNode[1] (1:22-1:24, 21-23)
        │    │ data: {"partOfSpeech":"TO"}
        │    └─0 TextNode "to" (1:22-1:24, 21-23)
        ├─12 WhiteSpaceNode " " (1:24-1:25, 23-24)
        ├─13 WordNode[1] (1:25-1:28, 24-27)
        │    │ data: {"partOfSpeech":"VB"}
        │    └─0 TextNode "buy" (1:25-1:28, 24-27)
        ├─14 WhiteSpaceNode " " (1:28-1:29, 27-28)
        ├─15 WordNode[3] (1:29-1:32, 28-31)
        │    │ data: {"partOfSpeech":"CD"}
        │    ├─0 TextNode "5" (1:29-1:30, 28-29)
        │    ├─1 PunctuationNode "." (1:30-1:31, 29-30)
        │    └─2 TextNode "2" (1:31-1:32, 30-31)
        ├─16 WhiteSpaceNode " " (1:32-1:33, 31-32)
        ├─17 WordNode[1] (1:33-1:40, 32-39)
        │    │ data: {"partOfSpeech":"NNS"}
        │    └─0 TextNode "gallons" (1:33-1:40, 32-39)
        ├─18 WhiteSpaceNode " " (1:40-1:41, 39-40)
        ├─19 WordNode[1] (1:41-1:43, 40-42)
        │    │ data: {"partOfSpeech":"IN"}
        │    └─0 TextNode "of" (1:41-1:43, 40-42)
        ├─20 WhiteSpaceNode " " (1:43-1:44, 42-43)
        ├─21 WordNode[1] (1:44-1:48, 43-47)
        │    │ data: {"partOfSpeech":"NN"}
        │    └─0 TextNode "milk" (1:44-1:48, 43-47)
        └─22 PunctuationNode "." (1:48-1:49, 47-48)
```

## API

This package exports no identifiers.
The default export is [`retextPos`][api-retext-pos].

### `unified().use(retextPos)`

Add part-of-speech (POS) tags.

###### Parameters

There are no parameters.

###### Returns

Transform ([`Transformer`][unified-transformer]).

## Types

This package is fully typed with [TypeScript][].
It exports no additional types.

## Compatibility

Projects maintained by the unified collective are compatible with maintained
versions of Node.js.

When we cut a new major release, we drop support for unmaintained versions of
Node.
This means we try to keep the current release line, `retext-pos@^4`, compatible
with Node.js 12.

## Contribute

See [`contributing.md`][contributing] in [`retextjs/.github`][health] for ways
to get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [Titus Wormer][author]

<!-- Definitions -->

[build-badge]: https://github.com/retextjs/retext-pos/workflows/main/badge.svg

[build]: https://github.com/retextjs/retext-pos/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/retextjs/retext-pos.svg

[coverage]: https://codecov.io/github/retextjs/retext-pos

[downloads-badge]: https://img.shields.io/npm/dm/retext-pos.svg

[downloads]: https://www.npmjs.com/package/retext-pos

[size-badge]: https://img.shields.io/bundlejs/size/retext-pos

[size]: https://bundlejs.com/?q=retext-pos

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/retextjs/retext/discussions

[npm]: https://docs.npmjs.com/cli/install

[esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c

[esmsh]: https://esm.sh

[typescript]: https://www.typescriptlang.org

[health]: https://github.com/retextjs/.github

[contributing]: https://github.com/retextjs/.github/blob/main/contributing.md

[support]: https://github.com/retextjs/.github/blob/main/support.md

[coc]: https://github.com/retextjs/.github/blob/main/code-of-conduct.md

[license]: license

[author]: https://wooorm.com

[nlcst-word]: https://github.com/syntax-tree/nlcst#word

[posjs]: https://github.com/dariusk/pos-js

[retext]: https://github.com/retextjs/retext

[unified]: https://github.com/unifiedjs/unified

[unified-transformer]: https://github.com/unifiedjs/unified#transformer

[api-retext-pos]: #unifieduseretextpos
