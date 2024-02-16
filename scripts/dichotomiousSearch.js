import { normalizeText, keepLettersOnly } from './functions.js'
/**
 * Creates a hash table based on the input array of recipes and their ingredients.
 *
 * @param {Array} array - The input array of recipes
 * @return {Object} The created hash table
 */
export const createHashTab = (array) => {
  const hashTable = Object.create(HashTab)
  array.forEach((recipe) => {
    recipe.ingredients.forEach((ingredient) => {
      const word = normalizeText(ingredient.ingredient)
      word.split(' ').forEach((word) => {
        word = normalizeText(keepLettersOnly(word))
        if (word.length >= 3) {
          hashTable.set(word, recipe.id)
        }
      })
    })
    normalizeText(recipe.name).split(' ').forEach((word) => {
      word = normalizeText(word)
      if (word.length >= 3) {
        word = keepLettersOnly(word)
        hashTable.set(word, recipe.id)
      }
    })
    normalizeText(recipe.description).split(' ').forEach((word) => {
      word = normalizeText(word)
      if (word.length >= 3) {
        word = keepLettersOnly(word)
        hashTable.set(word, recipe.id)
      }
    })
  })
  // console.log(hashTable)
  return hashTable
}

const HashTab = {
  table: [],
  size: 0,
  /**
   * Generates a hash value for the given key by summing the ASCII values of its characters and taking the modulus 100.
   *
   * @param {string} key - The key for which to generate a hash value.
   * @return {number} The generated hash value.
   */
  _hash (key) {
    let hash = 0
    key = keepLettersOnly(normalizeText(key))
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i)
    }
    return hash % 100
  },
  /**
   * Sets a key-value pair in the hash table.
   *
   * @param {type} key - the key to be set
   * @param {type} value - the value to be set
   * @return {void}
   */
  set (key, value) {
    const index = this._hash(key)
    if (this.table[index]) {
      for (let i = 0; i < this.table[index].length; i++) {
        if (this.table[index][i][0] === key) {
          if (!this.table[index][i][1].includes(value)) {
            this.table[index][i][1].push(value)
          }
          return
        }
      }
      this.table[index].push([key, [value]])
    } else {
      this.table[index] = []
      this.table[index].push([key, [value]])
    }
    this.size++
  },
  /**
   * A function to retrieve the value associated with the given key from the hash table.
   *
   * @param {type} key - the key to retrieve the associated value
   * @return {type} the value associated with the given key, or null if the key is not found
   */
  get (key) {
    const index = this._hash(key)
    if (this.table[index]) {
      for (let i = 0; i < this.table.length; i++) {
        if (this.table[index][i][0] === key) {
          return this.table[index][i][1]
        }
      }
    }
    return null
  }
}
