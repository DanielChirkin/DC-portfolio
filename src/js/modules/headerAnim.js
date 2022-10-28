// header animation

export const headerAnim = {
  isDestroyed: false,
  skipBtn: document.querySelector('.header__animation-skip-btn'),
  animElement: document.querySelector('.header__logo-animation'),
  removeAnimation(mlsec = 0) {
    setTimeout(() => {
      if (this.isDestroyed) return

      this.skipBtn.removeEventListener('click', headerAnim.destroyAnim)
      this.skipBtn = null
      this.animElement.remove()
      this.isDestroyed = true
      document.body.classList.remove('no-scroll')
    }, mlsec)
  },
  destroyAnim(e) {
    headerAnim.removeAnimation()
  }
}