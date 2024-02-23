import { normalizeText, hashFilter } from './functions.js'

/**
 * Function to perform a main search on an array, filtering based on filter words.
 *
 * @param {array} array - The input array containing base and filter words
 * @return {array} The modified input array after performing the main search
 */
export const mainSearch = (array, isFirstFilter = false) => {
  let baseArray = array.base
  if (array.totalFilters.length > 1 && !isFirstFilter) {
    baseArray = array.filtered
  }
  const foundRecipes = []
  for (let i = 0; i < array.mainFilters.length; i++) {
    const hashWord = hashFilter(normalizeText(array.mainFilters[i]))
    let a = 0
    let b = array.hashTab.table.length - 1
    do {
      const m = Math.floor((a + b) / 2)
      if (array.hashTab.table[m] === undefined) {
        if (a < b && m < hashWord) {
          b = b + 1
        } else {
          a = a - 1
        }
        continue
      }
      if (m === hashWord) {
        for (let j = 0; j < array.hashTab.table[m].length; j++) {
          if (array.hashTab.table[m][j][0] === array.mainFilters[i]) {
            array.hashTab.table[m][j][1].forEach(id => {
              if (!foundRecipes.includes(id)) {
                foundRecipes.push(id)
              }
            })
          }
        }
        break
      } else if (m < hashWord) {
        a = m + 1
      } else {
        b = m - 1
      }
    } while (a <= b)
  }
  array.filtered = baseArray.filter(recipe => {
    for (let i = 0; i < foundRecipes.length; i++) {
      if (recipe.id === foundRecipes[i]) {
        return true
      }
    }
    return false
  })
  // console.log({ baseArray })
  // console.log(array.filtered)
  return array
}

/**
 * Searches for ingredients in the given array and filters the base array based on the filter words.
 *
 * @param {array} array - The input array containing the base array, filter words, and ingredients to search for.
 * @return {array} The updated input array after filtering based on the ingredients search.
 */
export const searchIngredients = (array) => {
  let baseArray = array.base
  if (array.totalFilters.length > 1) {
    baseArray = array.filtered
  }
  const foundArray = baseArray.filter((item) => {
    return array.ingredientsFilters.every((filter) => {
      return item.ingredients.some(ingredients => normalizeText(ingredients.ingredient) === normalizeText(filter))
    })
  })
  array.filtered = foundArray
  return array
}

/**
 * A function to search for appliances based on given criteria.
 *
 * @param {array} array - The input array containing base, filterWords, and appliancesSearch
 * @return {object} The updated array after filtering the appliances
 */
export const searchAppliances = (array) => {
  let baseArray = array.base
  if (array.totalFilters.length > 1) {
    baseArray = array.filtered
  }
  baseArray = baseArray.filter((item) => {
    return array.appliancesFilters.every((filter) => {
      if (normalizeText(item.appliance).includes(normalizeText(filter))) {
        return true
      }
      return false
    })
  })
  array.filtered = baseArray
  return array
}

/**
 * Searches for ustensils in the given array based on the filter words provided.
 *
 * @param {Array} array - The array to be searched
 * @return {Object} The updated array with filtered ustensils
 */
export const searchUstensils = (array) => {
  let baseArray = array.base
  if (array.totalFilters.length > 1) {
    baseArray = array.filtered
  }
  baseArray = baseArray.filter((item) => {
    return array.ustensilsFilters.every((filter) => {
      return item.ustensils.some(ustensil => normalizeText(ustensil) === normalizeText(filter))
    })
  })
  array.filtered = baseArray
  return array
}
