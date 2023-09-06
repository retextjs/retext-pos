/**
 * @typedef {import('nlcst').Root} Root
 * @typedef {import('nlcst').Word} Word
 */

import {toString} from 'nlcst-to-string'
// @ts-expect-error: untyped.
import posjs from 'pos'
import {SKIP, visit} from 'unist-util-visit'

const tagger = new posjs.Tagger()

/**
 * Plugin to add part-of-speech (POS) tags.
 *
 * @returns
 *   Transform.
 */
export default function retextPos() {
  /**
   * Transform.
   *
   * @param {Root} tree
   *   Tree.
   * @returns {undefined}
   *   Nothing.
   */
  return function (tree) {
    visit(tree, 'SentenceNode', function (node) {
      /** @type {Array<Word>} */
      const nodes = []
      /** @type {Array<string>} */
      const values = []
      let index = -1

      // Find words.
      while (++index < node.children.length) {
        const child = node.children[index]

        if (child.type === 'WordNode') {
          nodes.push(child)
          values.push(toString(child))
        }
      }

      // Apply tags if there are words.
      if (nodes.length > 0) {
        const tags = tagger.tag(values)
        let index = -1

        while (++index < tags.length) {
          const node = nodes[index]
          const data = node.data || (node.data = {})
          data.partOfSpeech = tags[index][1]
        }
      }

      // Don’t enter sentences.
      return SKIP
    })
  }
}
