/* eslint-env browser */
/// <reference lib="dom" />

/**
 * @import {Nodes, Parents, Root} from 'nlcst'
 */

import ReactDom from 'react-dom/client'
import React from 'react'
import retextEnglish from 'retext-english'
import retextPos from 'retext-pos'
import {unified} from 'unified'
import {VFile} from 'vfile'

const $main = /** @type {HTMLElement} */ (document.querySelector('main'))
const $template = /** @type {HTMLTemplateElement} */ (
  document.querySelector('template')
)

/** @type {Record<string, string>} */
const map = {
  CC: 'Coord Conjunction',
  CD: 'Cardinal number',
  DT: 'Determiner',
  EX: 'Existential there',
  FW: 'Foreign Word',
  IN: 'Preposition',
  JJ: 'Adjective',
  JJR: 'Adjective, comparative',
  JJS: 'Adjective, superlative',
  LS: 'List item marker',
  MD: 'Modal',
  NN: 'Noun, singular or mass',
  NNP: 'Proper noun, singular',
  NNPS: 'Proper noun, plural',
  NNS: 'Noun, plural',
  POS: 'Possessive ending',
  PDT: 'Predeterminer',
  PP$: 'Possessive pronoun',
  PRP: 'Personal pronoun',
  RB: 'Adverb',
  RBR: 'Adverb, comparative',
  RBS: 'Adverb, superlative',
  RP: 'Particle',
  SYM: 'Symbol',
  TO: '"to"',
  UH: 'Interjection',
  VB: 'Verb, base form',
  VBD: 'Verb, past tense',
  VBG: 'Verb, gerund',
  VBN: 'Verb, past part',
  VBP: 'Verb, present',
  VBZ: 'Verb, present',
  WDT: 'Wh-determiner',
  WP: 'Wh pronoun',
  WP$: 'Possessive-Wh',
  WRB: 'Wh-adverb'
}

/** @type {Record<string, [dark: string, light: string]>} */
const mapColors = {}
let count = 0
const keys = Object.keys(map)
const step = 360 / keys.length

for (const key of keys) {
  const prefix = 'hsl(' + count * step + 'deg 96% '
  const suffix = ')'
  mapColors[key] = [prefix + '25%' + suffix, prefix + '90%' + suffix]
  count++
}

const processor = unified().use(retextEnglish).use(retextPos)

const root = ReactDom.createRoot($main)

root.render(React.createElement(Playground))

function Playground() {
  const [text, setText] = React.useState($template.innerHTML)
  const file = new VFile(text)
  const darkLightIndex = window.matchMedia('(prefers-color-scheme: dark)')
    .matches
    ? 0
    : 1

  const tree = /** @type {Root} */ (
    processor.runSync(processor.parse(file), file)
  )

  /** @type {Array<JSX.Element | string>} */
  const keys = []

  for (const [key, value] of Object.entries(map)) {
    const colors = mapColors[key]
    const backgroundColor = colors[darkLightIndex]
    keys.push(<span style={{backgroundColor}}>{value}</span>, ' ')
  }

  return (
    <div>
      <section className="highlight">
        <h1>
          <code>retext-pos</code>
        </h1>
      </section>
      <div className="editor">
        <div className="draw">
          {all(tree)}
          {/* Trailing whitespace in a `textarea` is shown,
          but not in a `div` with `white-space: pre-wrap`;
          add a `br` to make the last newline explicit. */}
          {/\n[ \t]*$/.test(text) ? <br /> : undefined}
        </div>
        <textarea
          className="write"
          onChange={(event) => setText(event.target.value)}
          rows={text.split('\n').length + 1}
          spellCheck="false"
          value={text}
        />
      </div>
      <section className="highlight">{keys}</section>
      <section className="credits">
        <p>
          <a href="https://github.com/retextjs/retext-pos">
            <code>retext-pos</code>
          </a>{' '}
          •{' '}
          <a href="https://github.com/retextjs/retext-pos/tree/website">
            Fork this website
          </a>{' '}
          •{' '}
          <a href="https://github.com/retextjs/retext-pos/blob/main/license">
            MIT
          </a>{' '}
          • <a href="https://github.com/wooorm">@wooorm</a>
        </p>
      </section>
    </div>
  )

  /**
   * @param {Parents} parent
   * @returns {Array<JSX.Element | string>}
   */
  function all(parent) {
    /** @type {Array<JSX.Element | string>} */
    const results = []

    for (const child of parent.children) {
      const result = one(child)
      if (Array.isArray(result)) {
        results.push(...result)
      } else {
        results.push(result)
      }
    }

    return results
  }

  /**
   * @param {Nodes} node
   * @returns {Array<JSX.Element | string> | JSX.Element | string}
   */
  function one(node) {
    const result = 'value' in node ? node.value : all(node)
    const tag = node.type === 'WordNode' ? node.data?.partOfSpeech : undefined

    if (tag && Object.hasOwn(mapColors, tag)) {
      const colors = mapColors[tag]
      const backgroundColor = colors[darkLightIndex]
      return <span style={{backgroundColor}}>{result}</span>
    }

    return result
  }
}
