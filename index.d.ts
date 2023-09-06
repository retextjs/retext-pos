export {default} from './lib/index.js'

// Register data.
declare module 'nlcst' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface WordData {
    /**
     * Part-of-speech tag (example: `'PRP'`).
     *
     * Registered by `retext-pos`.
     */
    partOfSpeech?: string
  }
}
