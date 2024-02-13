import { displayDropdownContent } from './dropdown.js'
import { displayRecipesArticles } from './index.js'
import { searchIngredients, searchAppliances, searchUstensils, mainSearch } from './search.js'
/**
 * Pushes a filter into the specified array based on the given type.
 *
 * @param {Array} array - The array to push the filter into
 * @param {string} type - The type of filter to push
 * @param {string} filterToPush - The filter to push into the array
 * @return {Array} The updated array with the filter pushed
 */
export const pushFilter = (array, type, filterToPush) => {
  switch (type) {
    case 'ingredients':
      array.ingredientsFilters.push(filterToPush)
      array.totalFilters.push(filterToPush)
      array = searchIngredients(array)
      break
    case 'appliances':
      array.appliancesFilters.push(filterToPush)
      array.totalFilters.push(filterToPush)
      array = searchAppliances(array)
      break
    case 'ustensils':
      array.ustensilsFilters.push(filterToPush)
      array.totalFilters.push(filterToPush)
      array = searchUstensils(array)
      break
    case 'mainSearch':
      array.mainFilters.push(filterToPush)
      array.totalFilters.push(filterToPush)
      array = mainSearch(array)
      break
    default:
      break
  }
  displayGlobalFilters(array)
  displayDropdownContent(array)
  displayRecipesArticles(array)
  return array
}

/**
 * Displays the global filters in the UI.
 *
 * @return {void}
 */
export const displayGlobalFilters = (array) => {
  document.querySelector('.selected__filter').innerHTML = ''
  array.totalFilters.forEach((item) => {
    const selectFilterItemDiv = document.createElement('div')
    selectFilterItemDiv.classList.add('selected__filter__item')
    const selectFilterItemName = document.createElement('span')
    selectFilterItemName.classList.add('selected__filter__item__name')
    selectFilterItemName.textContent = item
    selectFilterItemDiv.appendChild(selectFilterItemName)
    const selectFilterItemClose = document.createElement('span')
    selectFilterItemClose.classList.add('selected__filter__item__close')
    selectFilterItemClose.dataset.context = 'close-this-filter'
    const iconClose = document.createElement('i')
    iconClose.classList.add('fa-solid', 'fa-xmark')
    iconClose.dataset.context = 'close-this-filter-child'
    selectFilterItemClose.appendChild(iconClose)
    selectFilterItemDiv.appendChild(selectFilterItemClose)
    selectFilterItemClose.addEventListener('click', (e) => {
      const t = e.currentTarget.parentNode
      const filter = t.textContent
      deleteFilter(filter, array)
    })

    document.querySelector('.selected__filter').appendChild(selectFilterItemDiv)
  })
}

/**
 * Deletes the specified filter from the given array and updates the display accordingly.
 *
 * @param {string} filter - The filter to be deleted from the array
 * @param {object} array - The array containing the filters to be updated and displayed
 * @return {object} The updated array after deletion
 */
export const deleteFilter = (filter, array) => {
  const indexGlobal = array.totalFilters.indexOf(filter)
  const indexFilteredIngredients = array.ingredientsFilters.indexOf(filter)
  const indexFilteredAppliances = array.appliancesFilters.indexOf(filter)
  const indexFilteredUstensils = array.ustensilsFilters.indexOf(filter)
  const indexFilteredMainSearch = array.mainFilters.indexOf(filter)
  if (indexGlobal !== -1) {
    array.totalFilters.splice(indexGlobal, 1)
  }

  if (indexFilteredIngredients !== -1) {
    array.ingredientsFilters.splice(indexFilteredIngredients, 1)
  }

  if (indexFilteredAppliances !== -1) {
    array.appliancesFilters.splice(indexFilteredAppliances, 1)
  }

  if (indexFilteredUstensils !== -1) {
    array.ustensilsFilters.splice(indexFilteredUstensils, 1)
  }

  if (indexFilteredMainSearch !== -1) {
    array.mainFilters.splice(indexFilteredMainSearch, 1)
  }
  //  Revert to the original array because the filtered list no longer matches the filters
  array.filtered = array.base

  if (array.mainFilters.length > 0) {
    array = mainSearch(array)
  }

  if (array.ingredientsFilters.length > 0) {
    array = searchIngredients(array)
  }

  if (array.appliancesFilters.length > 0) {
    array = searchAppliances(array)
  }

  if (array.ustensilsFilters.length > 0) {
    array = searchUstensils(array)
  }

  displayDropdownContent(array)
  displayGlobalFilters(array)
  displayRecipesArticles(array)
  return array
}
