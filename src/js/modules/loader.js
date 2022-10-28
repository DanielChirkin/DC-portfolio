export const loader = {
  element: document.querySelector('.header__loader'),
  remove() {
    this.element.remove()
  }
}