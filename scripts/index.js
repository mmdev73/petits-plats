import { recipes } from '../data/recipes.js'
import { toggleDropdownContent, displayDropdownContent } from './dropdown.js'

// Object which contains all bases and filtered list
let refArray = {
  base: [],
  filtered: [],
  mainFilters: [],
  ingredientsBase: [],
  ingredientsFiltered: [],
  ingredientsFilters: [],
  appliancesBase: [],
  appliancesFiltered: [],
  appliancesFilters: [],
  ustensilsBase: [],
  ustensilsFiltered: [],
  ustensilsFilters: [],
  totalFilters: []
}
// deep copy of recipes
refArray.base = JSON.parse(JSON.stringify(recipes))
// Functions
/**
 * Display recipes articles based on the provided recipes array.
 *
 * @param {Array} recipesArray - The array of recipes to be displayed.
 * @return {void} This function does not return any value.
 */
export const displayRecipesArticles = (array) => {
  const recipesBox = document.querySelector('.recipes__box')
  const recipesCount = document.getElementById('recipes-result')
  recipesBox.innerHTML = ''
  let recipesArray = array.base
  if (array.totalFilters.length > 0) {
    recipesArray = array.filtered
  }
  recipesArray.forEach((recipe) => {
    const imgName = recipe.image.split('.')
    const imgLink = './assets/recipes/' + imgName[0] + '.webp'
    const articleDOM = document.createElement('article')
    articleDOM.classList.add('card')
    const figureDOM = document.createElement('figure')
    figureDOM.classList.add('card__figure')
    const imgDOM = document.createElement('img')
    imgDOM.classList.add('card__figure__img')
    imgDOM.setAttribute('src', imgLink)
    imgDOM.setAttribute('alt', recipe.name)
    const figcaptionDOM = document.createElement('figcaption')
    figcaptionDOM.classList.add('card__figure__time')
    figcaptionDOM.textContent = recipe.time + 'min'
    figureDOM.appendChild(imgDOM)
    figureDOM.appendChild(figcaptionDOM)
    const contentDOM = document.createElement('div')
    contentDOM.classList.add('card__content')
    const titleDOM = document.createElement('h3')
    titleDOM.classList.add('card__content__title')
    titleDOM.textContent = recipe.name
    const subtitleDOM = document.createElement('h2')
    subtitleDOM.classList.add('card__content__subtitle')
    subtitleDOM.textContent = 'Recette'
    const descriptionDOM = document.createElement('p')
    descriptionDOM.classList.add('card__content__description')
    descriptionDOM.textContent = recipe.description
    const ingredientsTitleDOM = document.createElement('h2')
    ingredientsTitleDOM.classList.add('card__content__subtitle')
    ingredientsTitleDOM.textContent = 'Ingrédients'
    const ingredientsListDOM = document.createElement('ul')
    ingredientsListDOM.classList.add('card__content__ingredients')
    recipe.ingredients.forEach((ingredient) => {
      const ingredientDOM = document.createElement('li')
      ingredientDOM.classList.add('card__content__ingredients__item')
      const ingredientNameDOM = document.createElement('span')
      ingredientNameDOM.classList.add('card__content__ingredients__item__name')
      ingredientNameDOM.textContent = ingredient.ingredient
      ingredientDOM.appendChild(ingredientNameDOM)
      const ingredientQtyDOM = document.createElement('span')
      ingredientQtyDOM.classList.add('card__content__ingredients__item__qty')
      ingredientQtyDOM.textContent = (ingredient.quantity ? ingredient.quantity : '') + ' ' + (ingredient.unit ? ingredient.unit : '')
      ingredientDOM.appendChild(ingredientQtyDOM)
      ingredientsListDOM.appendChild(ingredientDOM)
    })
    contentDOM.appendChild(titleDOM)
    contentDOM.appendChild(subtitleDOM)
    contentDOM.appendChild(descriptionDOM)
    contentDOM.appendChild(ingredientsTitleDOM)
    contentDOM.appendChild(ingredientsListDOM)
    articleDOM.appendChild(figureDOM)
    articleDOM.appendChild(contentDOM)
    recipesBox.appendChild(articleDOM)
  })
  recipesCount.textContent = recipesArray.length
}

const dropdownBtn = document.querySelectorAll('.dropdown__btn')
dropdownBtn.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const elemId = e.currentTarget.id
    toggleDropdownContent(elemId)
  })
})

// When user arrive in website
displayRecipesArticles(refArray)
refArray = displayDropdownContent(refArray)
