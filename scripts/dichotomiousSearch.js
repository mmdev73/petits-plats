import { normalizeText, keepLettersOnly } from './functions.js'
export const generatedHashTable = (array) => {
  array.forEach((recipe) => {
    recipe.hashTab = []
    recipe.ingredients.forEach((ingredient) => {
      normalizeText(ingredient.ingredient).split(' ').forEach((word) => {
        word = keepLettersOnly(word)
        if (word.length > 3) {
          recipe.hashTab.push(normalizeText(word))
        }
      })
    })
    normalizeText(recipe.name).split(' ').forEach((word) => {
      word = keepLettersOnly(word)
      if (word.length > 3) {
        recipe.hashTab.push(normalizeText(word))
      }
    })
    recipe.description.split(' ').forEach((word) => {
      word = keepLettersOnly(word)
      if (word.length > 3) {
        recipe.hashTab.push(normalizeText(word))
      }
    })

    recipe.hashTab = [...new Set(recipe.hashTab.sort())]
  })
  return array
}
