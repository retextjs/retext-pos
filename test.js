import assert from 'node:assert/strict'
import test from 'node:test'
import structuredClone from '@ungap/structured-clone'
import {ParseEnglish} from 'parse-english'
import {unified} from 'unified'
import {u} from 'unist-builder'
import {removePosition} from 'unist-util-remove-position'
import retextPos from './index.js'

test('retext-pos', async function (t) {
  await t.test('should expose the public api', async function () {
    assert.deepEqual(Object.keys(await import('./index.js')).sort(), [
      'default'
    ])
  })

  await t.test('should work', async function () {
    const tree = new ParseEnglish().parse(
      'I went to the store, to buy 5.2 gallons of milk.'
    )

    await unified().use(retextPos).run(tree)

    removePosition(tree, {force: true})

    assert.deepEqual(
      tree,
      u('RootNode', [
        u('ParagraphNode', [
          u('SentenceNode', [
            u('WordNode', {data: {partOfSpeech: 'PRP'}}, [u('TextNode', 'I')]),
            u('WhiteSpaceNode', ' '),
            u('WordNode', {data: {partOfSpeech: 'VBD'}}, [
              u('TextNode', 'went')
            ]),
            u('WhiteSpaceNode', ' '),
            u('WordNode', {data: {partOfSpeech: 'TO'}}, [u('TextNode', 'to')]),
            u('WhiteSpaceNode', ' '),
            u('WordNode', {data: {partOfSpeech: 'DT'}}, [u('TextNode', 'the')]),
            u('WhiteSpaceNode', ' '),
            u('WordNode', {data: {partOfSpeech: 'NN'}}, [
              u('TextNode', 'store')
            ]),
            u('PunctuationNode', ','),
            u('WhiteSpaceNode', ' '),
            u('WordNode', {data: {partOfSpeech: 'TO'}}, [u('TextNode', 'to')]),
            u('WhiteSpaceNode', ' '),
            u('WordNode', {data: {partOfSpeech: 'VB'}}, [u('TextNode', 'buy')]),
            u('WhiteSpaceNode', ' '),
            u('WordNode', {data: {partOfSpeech: 'CD'}}, [
              u('TextNode', '5'),
              u('PunctuationNode', '.'),
              u('TextNode', '2')
            ]),
            u('WhiteSpaceNode', ' '),
            u('WordNode', {data: {partOfSpeech: 'NNS'}}, [
              u('TextNode', 'gallons')
            ]),
            u('WhiteSpaceNode', ' '),
            u('WordNode', {data: {partOfSpeech: 'IN'}}, [u('TextNode', 'of')]),
            u('WhiteSpaceNode', ' '),
            u('WordNode', {data: {partOfSpeech: 'NN'}}, [
              u('TextNode', 'milk')
            ]),
            u('PunctuationNode', '.')
          ])
        ])
      ])
    )
  })

  await t.test('should support an empty sentence', async function () {
    const tree = u('RootNode', [
      u('ParagraphNode', [
        u('SentenceNode', [u('SymbolNode', '&'), u('PunctuationNode', '.')])
      ])
    ])
    const expected = structuredClone(tree)

    await unified().use(retextPos).run(tree)

    assert.deepEqual(tree, expected)
  })
})
