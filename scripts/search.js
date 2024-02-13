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
  const newArray = []
  for (let i = 0; i < baseArray.length; i++) {
    const recipe = baseArray[i]
    const found = []
    for (let j = 0; j < array.mainFilters.length; j++) {
      const filter = array.mainFilters[j]
      let isFound = false
      if (
        normalizeText(recipe.name).includes(normalizeText(filter)) ||
        normalizeText(recipe.description).includes(normalizeText(filter))
      ) {
        isFound = true
      }
      if (isFound) {
        found.push(true)
        continue
      }
      for (let k = 0; k < recipe.ingredients.length; k++) {
        const ingredients = recipe.ingredients[k]
        if (normalizeText(ingredients.ingredient).includes(normalizeText(filter))) {
          isFound = true
        }
      }
      if (isFound) {
        found.push(true)
      }
    }
    if (found.length === array.mainFilters.length && !found.includes(false)) {
      newArray.push(recipe)
    }
  }
  array.filtered = newArray
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
  const newArray = []
  for (let i = 0; i < baseArray.length; i++) {
    const recipe = baseArray[i]
    const found = []
    for (let j = 0; j < array.ingredientsFilters.length; j++) {
      const filter = array.ingredientsFilters[j]
      for (let k = 0; k < recipe.ingredients.length; k++) {
        const ingredients = recipe.ingredients[k]
        if (normalizeText(ingredients.ingredient).includes(normalizeText(filter))) {
          found.push(true)
          break
        }
      }
    }
    if (found.length === array.ingredientsFilters.length) {
      newArray.push(recipe)
    }
  }
  array.filtered = newArray
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
  const newArray = []
  for (let i = 0; i < baseArray.length; i++) {
    const recipe = baseArray[i]
    const found = []
    for (let j = 0; j < array.appliancesFilters.length; j++) {
      const filter = array.appliancesFilters[j]
      if (normalizeText(recipe.appliance).includes(normalizeText(filter))) {
        found.push(true)
        break
      }
    }
    if (found.length === array.appliancesFilters.length) {
      newArray.push(recipe)
    }
  }
  array.filtered = newArray
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
  const newArray = []
  for (let i = 0; i < baseArray.length; i++) {
    const recipe = baseArray[i]
    const found = []
    for (let j = 0; j < array.ustensilsFilters.length; j++) {
      const filter = array.ustensilsFilters[j]
      for (let k = 0; k < recipe.ustensils.length; k++) {
        const ustensil = recipe.ustensils[k]
        if (normalizeText(ustensil).includes(normalizeText(filter))) {
          found.push(true)
          break
        }
      }
    }
    if (found.length === array.ustensilsFilters.length) {
      newArray.push(recipe)
    }
  }
  array.filtered = newArray
  return array
}
