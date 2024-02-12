import { normalizeText } from './functions.js'
/**
 * Toggles the chevron icon for the given element and updates other chevron icons accordingly.
 *
 * @param {string} elemId - The id of the element containing the chevron icon.
 * @return {void}
 */
const toggleChevron = (elemId = null, closeAll = false) => {
  const allChevronElem = document.querySelectorAll('.dropdown__btn--icon')
  if (elemId !== null) {
    const chevronElem = document.querySelector(`#${elemId} .dropdown__btn--icon`)
    chevronElem.classList.toggle('fa-chevron-down')
    chevronElem.classList.toggle('fa-chevron-up')
    allChevronElem.forEach((item) => {
      if (item !== chevronElem) {
        item.classList.remove('fa-chevron-up')
        item.classList.add('fa-chevron-down')
      }
    })
  }
  if (elemId === null && closeAll) {
    allChevronElem.forEach((item) => {
      item.classList.remove('fa-chevron-up')
      item.classList.add('fa-chevron-down')
    })
  }
}

/**
 * Toggles the visibility of a dropdown content and optionally closes all other dropdowns.
 *
 * @param {string} elemId - The ID of the dropdown element to toggle.
 * @param {boolean} closeall - Flag indicating whether to close all other dropdowns.
 * @return {void}
 */
export const toggleDropdownContent = (elemId = null, closeall = false) => {
  toggleChevron(elemId, closeall)
  const allDropDownSubPart = document.querySelectorAll('.dropdown-subpart')
  if (elemId !== null) {
    const dropDownSubPart = document.querySelector(`#${elemId}`).nextElementSibling
    dropDownSubPart.classList.toggle('dropdown--active')
    allDropDownSubPart.forEach((item) => {
      if (item.id !== dropDownSubPart.id && item.classList.contains('dropdown--active')) {
        item.classList.remove('dropdown--active')
      }
    })
  }
  if (elemId === null && closeall) {
    allDropDownSubPart.forEach((item) => {
      item.classList.remove('dropdown--active')
    })
  }
}

/**
 * Function for displaying dropdown content based on the given array, type, and search input.
 *
 * @param {array} array - The array of items to display in dropdowns
 * @param {string} [type=null] - The type of dropdown to display
 * @param {string} [searchInput=null] - The search input to filter dropdown content
 * @return {array} The updated array
 */
export const displayDropdownContent = (array, type = null, search = false) => {
  if (type === null && !search) {
    //* Feed all bases to dropdowns, then gen list and display each
    const { ingredients, appliances, ustensils } = getAllBaseDropdownLists((array.totalFilters.length > 0) ? array.filtered : array.base)
    if (array.totalFilters.length > 0) {
      array.ingredientsFiltered = ingredients
      array.appliancesFiltered = appliances
      array.ustensilsFiltered = ustensils
    } else {
      array.ingredientsBase = ingredients
      array.appliancesBase = appliances
      array.ustensilsBase = ustensils
    }
    genList(array, 'ingredients')
    genList(array, 'appliances')
    genList(array, 'ustensils')
    return array
  }
  if (type !== null && !search) {
    genList(array, type)
    return array
  }
  if (type !== null && search) {
    genList(array, 'ingredients')
    genList(array, 'appliances')
    genList(array, 'ustensils')
    return array
  }
}

/**
 * Get all base dropdown lists from the given array of recipes.
 *
 * @param {Array} array - The array of recipes
 * @return {Object} An object containing unique lists of ingredients, appliances, and ustensils
 */

const getAllBaseDropdownLists = (array) => {
  const ingredientsList = array.flatMap((recipe) => recipe.ingredients.map((ingredient) => normalizeText(ingredient.ingredient)))
  const appliancesList = array.map((recipe) => normalizeText(recipe.appliance))
  const ustensilsList = array.flatMap((recipe) => recipe.ustensils.map((ustensil) => normalizeText(ustensil)))

  return {
    ingredients: Array.from(new Set(ingredientsList)),
    appliances: Array.from(new Set(appliancesList)),
    ustensils: Array.from(new Set(ustensilsList))
  }
}

/**
 * Generates a list based on the given array and type, and updates the DOM elements accordingly.
 *
 * @param {Array} array - The input array to generate the list from
 * @param {string} type - The type of list to generate (ingredients, appliances, ustensils)
 * @return {Array} The updated input array with the list elements
 */

const genList = (array, type) => {
  let filtersArray = []
  let arrayToDisplay = []
  switch (type) {
    case 'ingredients':
      filtersArray = array.ingredientsFilters
      arrayToDisplay = (array.filtered.length > 0) ? array.ingredientsFiltered : array.ingredientsBase
      break
    case 'appliances':
      filtersArray = array.appliancesFilters
      arrayToDisplay = (array.filtered.length > 0) ? array.appliancesFiltered : array.appliancesBase
      break
    case 'ustensils':
      filtersArray = array.ustensilsFilters
      arrayToDisplay = (array.filtered.length > 0) ? array.ustensilsFiltered : array.ustensilsBase
      break
    default:
      break
  }
  const idListItems = 'dropdown-list-' + type
  const idListItemsFilter = 'dropdown-list-' + type + '-filter'
  document.getElementById(idListItemsFilter).innerHTML = ''
  document.getElementById(idListItems).innerHTML = ''
  arrayToDisplay.forEach((item) => {
    if (filtersArray.includes(item)) {
      array = filterListItemComponent(array, type, idListItemsFilter, item)
    } else {
      array = nonFilterListItemComponent(array, type, idListItems, item)
    }
  })
  return array
}

/**
 * Creates a new list item with the provided item and type, and appends it to the specified list.
 *
 * @param {array} array - The array to be updated with a new filter.
 * @param {string} type - The type of the list item.
 * @param {string} idListItems - The id of the list where the item will be appended.
 * @param {string} item - The content of the list item.
 * @return {array} The updated array with the new filter added.
 */
const nonFilterListItemComponent = (array, type, idListItems, item) => {
  const itemList = document.createElement('li')
  itemList.classList.add('dropdown__list__item')
  itemList.dataset.context = 'dd-list-item'
  itemList.dataset.type = type
  itemList.textContent = item
  document.getElementById(idListItems).appendChild(itemList)
  itemList.addEventListener('click', (e) => {
    const t = e.target
    // do stuff here when filter is click
  })
  return array
}

/**
 * Function to filter list item component.
 *
 * @param {array} array - The array to filter.
 * @param {type} type - Description of type.
 * @param {string} idListItemsFilter - The ID of the list items filter.
 * @param {item} item - The item to be added to the list.
 * @return {array} The updated array with the new filter added.
 */
const filterListItemComponent = (array, type, idListItemsFilter, item) => {
  const itemList = document.createElement('li')
  itemList.classList.add('dropdown__list__item__filter')
  const itemListName = document.createElement('span')
  itemListName.classList.add('selected__filter__item__name')
  itemListName.textContent = item
  const itemListClose = document.createElement('span')
  itemListClose.classList.add('selected__filter__item__close')
  itemListClose.dataset.context = 'close-this-filter'
  const iconClose = document.createElement('i')
  iconClose.classList.add('fa-solid', 'fa-xmark')
  iconClose.dataset.context = 'close-this-filter-child'
  itemList.appendChild(itemListName)
  itemListClose.appendChild(iconClose)
  itemList.appendChild(itemListClose)
  document.getElementById(idListItemsFilter).appendChild(itemList)
  itemListClose.addEventListener('click', (e) => {
    const t = e.currentTarget
    // do stuff when close button on filter is clicked
  })
  return array
}
