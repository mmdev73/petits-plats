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
