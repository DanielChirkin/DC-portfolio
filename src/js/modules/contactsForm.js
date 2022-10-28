// import { writeData } from "./firebase.js"

const formInputs = document.querySelectorAll('.contacts__form-input')
const select = document.querySelector('[data-custom-select] select')
const dropdown = document.querySelector('.dropdown')

export const formInput = () => {
  formInputs.forEach((formInput) => {
    formInput.addEventListener('focus', (e) => {
      e.target.parentNode.classList.add('active')
      
      if ( e.target.parentNode.classList.contains('dropdown') ) {
        dropdown.classList.add('dropdown-active')
      }
    })

    formInput.addEventListener('focusout', (e) => {
      
      if ( e.target.hasAttribute('data-custom-select') && (select.value && select.value !== 'empty') ) {
        e.target.parentNode.classList.remove('dropdown-active')
        return
      }

      if ( e.target.value ) return

      e.target.parentNode.classList.remove('active')

      if ( e.target.parentNode.classList.contains('dropdown') ) {
        dropdown.classList.remove('dropdown-active')
      }
    })
  })
}

// custom select
// structure
/* 
<div tabindex="-1" class="select" id="select" data-custom-select >
  <ul class="select-options">
    <li data-select-option="design">Заказать дизайн</li>
    <li data-select-option="development">Заказать разработку сайта</li>
    <li data-select-option="design-n-development">Заказать дизайн и разработку</li>
    <li data-select-option="illustration">Заказать иллюстрацию</li>
    <li data-select-option="icons">Заказать иконки</li>
    <li data-select-option="hire">Нанять</li>
    <li data-select-option="other">Другое</li>
  </ul>
  <select name="topic" id="topic" required>
    <option value="empty"></option>
    <option value="design"></option>
    <option value="development"></option>
    <option value="design-n-development"></option>
    <option value="illustration"></option>
    <option value="icons"></option>
    <option value="hire"></option>
    <option value="other"></option>
  </select>
</div>
*/

export const customSelect = () => {
  const customSelect = document.querySelector('[data-custom-select]')
  const selectOptions = customSelect.querySelectorAll('[data-select-option]')

  customSelect.addEventListener('click', (e) => {
    if (dropdown.classList.contains('dropdown-active')) return

    e.target.focus()
  })

  selectOptions.forEach((opt) => {
    opt.addEventListener('click', (e) => {
      const value = e.target.getAttribute('data-select-option')
      const text = e.target.innerText
    
      const textElement = document.createElement('p')
      textElement.innerText = text
      

      const p = customSelect.querySelector('p')
      if ( p ) customSelect.removeChild(p)
      
      select.value = value
      customSelect.appendChild(textElement)

      dropdown.classList.remove('dropdown-active')
      customSelect.blur()
    })
  })
}

export class FormValidation {
  constructor( {form, nameInput, email, select, checkbox, message} ) {
    this.nameInput = nameInput
    this.email = email
    this.select = select
    this.message = message
    this.form = form
    this.checkbox = checkbox
    this.checkboxNameAttribute = checkbox.getAttribute('name')
    this.inputs = [nameInput, email, checkbox, message]
    this.errorSelector = 'span.contacts__form-validation'
  }
  isValid(input, custom = false) {
    let isValid

    if ( custom )
    isValid = input.value !== 'empty'
    else
    isValid = input.validity.valid

    return isValid
  }
  showError(input, {valueMissingText, tooLongText, tooShortText, typeMismatchText, custom = false}) {
    let formItem
    if ( custom ) formItem = input.parentNode.parentNode
    else
    formItem = input.parentNode
    const error = formItem.querySelector(this.errorSelector)

    if (input.validity.valueMissing) {
      error.textContent = valueMissingText ? valueMissingText : "Поле не должно быть пустым!"
    } else if (input.validity.typeMismatch) {
      error.textContent = typeMismatchText ? typeMismatchText : "Введите корректные данные!"
    } 
    else if (input.validity.tooLong) {
      error.textContent = tooLongText ? tooLongText : `Максимальное колличество символов - ${input.maxLength}; Сейчас - ${input.value.length}`
    } else if (input.validity.tooShort) {
      error.textContent = tooShortText ? tooShortText : `Минимальное колличество символов: ${input.minLength}; Сейчас: ${input.value.length}`
    }
    
    if ( custom ) {
      if ( input.value === 'empty' ) {
        error.textContent = valueMissingText ? valueMissingText : "Поле не должно быть пустым!"
      }
    }
      
    formItem.classList.add('invalid')
  }
  isFormValid() {
    return this.isValid(this.nameInput) && this.isValid(this.email) && this.isValid(this.select, true) && this.isValid(this.message) && this.isValid(this.checkbox)
  }
  removeError(input, custom = false) {
    let inputItem

    if ( custom ) {
      inputItem = input.parentNode.parentNode
    }
    else
    inputItem = input.parentNode
    const error = inputItem.querySelector(this.errorSelector)

    inputItem.classList.remove('invalid')
    inputItem.classList.add('valid')
    
    error.textContent = ''

    if ( custom ) {
      const customInput = inputItem.querySelector('div')
      customInput.blur()
    }

    inputItem.blur()
  }
  showErrors() {
    if ( !this.isValid(this.nameInput) ) {
      this.showError(
        this.nameInput,
        { valueMissingText: 'Введите свое имя!' }
      )
    }
    else {
      this.removeError(this.nameInput)
    }

    if ( !this.isValid( this.email ) ) {
      this.showError(
        this.email, 
        { valueMissingText: 'Введите свой email!', typeMismatchText: 'Введите корректный email адрес!' }
      )
    }
    else {
      this.removeError(this.email)
    }

    if (  !this.isValid( this.select, true ) ) {
      this.showError(
        this.select,
        { valueMissingText: 'Выберите тему сообщения!', custom: true }
      )
    }
    else {
      this.removeError(this.select, true)
    }

    if ( !this.isValid( this.checkbox )) {
      this.showError(
        this.checkbox, { valueMissingText: 'Вам понятно предупреждение?', custom: true }
      )
    }
    else {
      this.removeError( this.checkbox, true )
    }

    if ( !this.isValid( this.message )) {
      this.showError(
        this.message, { valueMissingText: 'Введите сообщение!'}
      )
    }
    else {
      this.removeError( this.message )
    }
  }
  resetForm() {
    this.form.reset()

    // inputs
    this.inputs.forEach(input => {
      let inputItem;

      if ( input.getAttribute('name') === this.checkboxNameAttribute )
        inputItem = input.parentNode.parentNode
      else
        inputItem = input.parentNode


      const error = inputItem.querySelector(this.errorSelector)

      inputItem.classList.remove('invalid')
      inputItem.classList.remove('valid')
      inputItem.classList.remove('active')
      error.textContent = ''

      input.blur()
    })

    // select
    const inputItem = this.select.parentNode.parentNode
    const selectInput = inputItem.querySelector('div')
    const selectText = inputItem.querySelector('p')
    const error = inputItem.querySelector(this.errorSelector)
    

    inputItem.classList.remove('invalid')
    inputItem.classList.remove('valid')
    inputItem.classList.remove('active')
    selectText.textContent = ''
    error.textContent = ''
    selectInput.blur()
  }
  addEventToForm() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault()
      if ( !this.isFormValid() ) {
        this.showErrors()
      }
      else {
        const formData = {
          name: this.nameInput.value,
          email: this.email.value,
          topic: this.select.value,
          message: this.message.value
        }

        this.resetForm()
        
        console.log(formData);
        
        // writeData(formData)
      }
    })
  }
  init() {
    this.addEventToForm()
  }
}
