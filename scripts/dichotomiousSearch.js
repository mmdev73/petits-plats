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
  _hash (key) {
    let hash = 0
    key = keepLettersOnly(normalizeText(key)) // normalizeText(key)
    for (let i = 0; i < key.length; i++) {
      hash += key.charCodeAt(i)
    }
    // if (key === 'limonade' || key === 'riz') {
    //   // ! PROBLEM HERE
    //   console.log('KEY : ' + key + ' HASH : ' + hash + ' HASH MODULO 100 : ' + (hash % 100))
    // }
    return hash % 100
  },
  set (key, value) { // lait de coco, recipe.id
    // if ([1, 2, 3, 21].includes(value)) {
    //   console.log('Key: ' + key + ' Key Hashé : ' + this._hash(key) + ' Value: ' + value)
    // }
    const index = this._hash(key)
    // if (key === 'limonade' || key === 'riz') {
    //   // ! PROBLEM HERE
    //   console.log('SET() | KEY : ' + key + ' HASH : ' + this._hash(key) + ' INDEX : ' + index + ' VALUE : ' + value)
    // }
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
