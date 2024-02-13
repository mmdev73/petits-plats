/**
 * Replaces backslashes with the corresponding escaped character.
 *
 * @param {string} s - the input string
 * @return {string} the string with escaped characters replaced
 */
const stripslashes = (s) => {
  return (s + '').replace(/\\(.?)/g, function (_s, n1) {
    switch (n1) {
      case '\\':
        return '\\'
      case '0':
        return '\u0000'
      case '':
        return ''
      default:
        return n1
    }
  })
}

/**
 * Replaces special characters in the input text with their corresponding HTML entities.
 *
 * @param {string} text - The input text to escape
 * @return {string} The escaped text
 */
const escapeHtml = (text) => {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  }

  return text.replace(/[&<>"']/g, function (m) { return map[m] })
}

/**
 * Normalizes the input text by lowering case, escaping HTML, removing backslashes, trimming the text, and normalizing it to Unicode Normalization Form D (NFD).
 *
 * @param {string} text - The input text to be normalized.
 * @return {string} The normalized text.
 */
export const normalizeText = (text) => {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
  return escapeHtml(stripslashes(text.toLowerCase())).trim().normalize('NFD')
}

export const keepLettersOnly = (text) => {
  return text.replace(/[^a-zA-ZÀ-ÖØ-öøçû]/g, ' ')
}
