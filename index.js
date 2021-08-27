/**
 * @typedef {import('nlcst').Root} Root
 * @typedef {import('nlcst').Word} Word
 */

import {visit, SKIP} from 'unist-util-visit'
import {toString} from 'nlcst-to-string'
// @ts-expect-error: untyped.
import posjs from 'pos'

const tagger = new posjs.Tagger()

/**
 * Plugin to add part-of-speech (POS) tags.
 *
 * @type {import('unified').Plugin<[], Root>}
 */
export default function retextPos() {
  return (tree) => {
    visit(tree, 'SentenceNode', (node) => {
      const children = node.children
      /** @type {Word[]} */
      const words = []
      let index = -1

      // Find words.
      while (++index < children.length) {
        const child = children[index]

        if (child.type === 'WordNode') {
          words.push(child)
        }
      }

      // Apply tags if there are words.
      if (words.length > 0) {
        const tags = tagger.tag(words.map((node) => toString(node)))
        index = -1

        while (++index < tags.length) {
          const node = words[index]
          const data = node.data || (node.data = {})
          data.partOfSpeech = tags[index][1]
        }
      }

      // Don’t enter sentences.
      return SKIP
    })
  }
}
