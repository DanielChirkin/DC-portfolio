import * as functions from './modules/functions.js'

import { swiper } from './modules/plugins/projectsSwiper.js'
import { headerAnim } from './modules/headerAnim.js'
import { formInput, customSelect, FormValidation } from './modules/contactsForm.js'
import { loader } from './modules/loader.js'
import { Burger } from './modules/burger.js'
import { anchorSmoothScrolling } from './modules/anchorSmoothScrolling.js'
  

// functions
functions.isWebp()


// header animation
document.body.classList.add('no-scroll')
headerAnim.skipBtn.addEventListener('click', headerAnim.destroyAnim)

document.isLoaded = false
window.addEventListener('load', () => {
  loader.remove()
  headerAnim.animElement.style.display = 'flex'
  headerAnim.removeAnimation(5500)
  document.isLoaded = true
})


// contacts form
formInput()
customSelect()

  // validation
const nameInput = document.forms['contacts-form']['name']
const email = document.forms['contacts-form']['email']
const topic = document.forms['contacts-form']['topic']
const checkbox = document.forms['contacts-form']['alert-accept']
const message = document.forms['contacts-form']['message']
const form = document.querySelector('.contacts__form')

const validation = new FormValidation({
  form,
  nameInput,
  email,
  select: topic,
  checkbox,
  message
})

validation.init()


// burger
const header = 'header'
const contacts = '.contacts'
const burgerElements = '.header__burger, .header__nav-item a, .header__right-content'
const robot = '.header__right-content'
const robotImg = '.header__right-content img'
const burgerSelector = '.header__burger'
const activeClass = 'active'
const followClass = 'follow'

const burger = new Burger({
  header,
  contacts,
  burgerElements,
  robot,
  robotImg,
  burger: burgerSelector,
  activeClass,
  followClass
})

burger.init()

// smoothScrolling
anchorSmoothScrolling()