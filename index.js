import {visit, SKIP} from 'unist-util-visit'
import {toString} from 'nlcst-to-string'
import posjs from 'pos'

var tagger = new posjs.Tagger()

export default function retextPos() {
  return transformer
}

function transformer(tree) {
  visit(tree, 'SentenceNode', visitor)

  // Patch all words in `parent`.
  function visitor(node) {
    var children = node.children
    var length = children.length
    var index = -1
    var values = []
    var words = []
    var child
    var tags

    // Find words.
    while (++index < length) {
      child = children[index]

      if (child.type === 'WordNode') {
        values.push(toString(child))
        words.push(child)
      }
    }

    // Apply tags if there are words.
    if (values.length > 0) {
      tags = tagger.tag(values)
      length = tags.length
      index = -1

      while (++index < length) {
        patch(words[index], tags[index][1])
      }
    }

    // Don’t enter sentences.
    return SKIP
  }

  // Patch a `partOfSpeech` property on `node`s.
  function patch(node, tag) {
    var data = node.data || (node.data = {})
    data.partOfSpeech = tag
  }
}
