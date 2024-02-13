import { normalizeText } from './functions.js'

/**
 * Function to perform a main search on an array, filtering based on filter words.
 *
 * @param {array} array - The input array containing base and filter words
 * @return {array} The modified input array after performing the main search
 */
export const mainSearch = (array) => {
  let baseArray = array.base
  if (array.totalFilters.length > 1) {
    baseArray = array.filtered
  }
  baseArray = baseArray.filter((item) => {
    return array.mainFilters.every((filter) => {
      let found = false
      let a = 0
      let b = item.hashTab.length
      do {
        const m = Math.floor((a + b) / 2)
        if (item.hashTab[m] === filter) {
          found = true
        }
        if (item.hashTab[m] > filter) {
          b = m - 1
        }
        if (item.hashTab[m] < filter) {
          a = m + 1
        }
        if (a > b) {
          found = false
        }
      } while (!found && (a < b))
      return found
    })
  }
  )
  array.filtered = baseArray
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
