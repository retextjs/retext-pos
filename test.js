import test from 'tape'
import retext from 'retext'
import u from 'unist-builder'
import removePosition from 'unist-util-remove-position'
import pos from './index.js'

test('pos()', function (t) {
  var proc = retext().use(pos)

  t.test('A sentence', function (st) {
    var tree = proc.parse('I went to the store, to buy 5.2 gallons of milk.')

    proc.runSync(tree)
    removePosition(tree, true)

    st.deepEqual(
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

    st.end()
  })

  t.test('An empty sentence', function (st) {
    var tree = u('RootNode', [
      u('ParagraphNode', [
        u('SentenceNode', [u('SymbolNode', '&'), u('PunctuationNode', '.')])
      ])
    ])
    var exact = JSON.parse(JSON.stringify(tree))

    st.deepEqual(proc.runSync(tree), exact)

    st.end()
  })

  t.end()
})
