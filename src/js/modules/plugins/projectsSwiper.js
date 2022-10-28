// import Swiper JS
import Swiper, { Navigation, Pagination } from 'swiper'


const slider = '[data-projects-slider]'
const prevArrow = '[data-projects-prevArrow]'
const nextArrow = '[data-projects-nextArrow]'
const arrows = '[data-projects-arrows]'
const dots = '[data-projects-dots]'

const options = {
  modules: [Navigation, Pagination],
  pagination: {
    el: dots,
    clickable: true,
    dynamicBullets: true
  },
  navigation: {
    nextEl: nextArrow,
    prevEl: prevArrow,
  },
  breakpoints: {
    // when window width is >= 500px
    0: {
      centeredSlides: false,
      slidesPerView: 1,
      slidesPerGroup: 1,
      spaceBetween: 20,
      
    },
    600: {
      centeredSlides: false,
      slidesPerView: 2,
      slidesPerGroup: 2,
      spaceBetween: 20,
    },
    900: {
      spaceBetween: 20,
      slidesPerView: 3,
      slidesPerGroup: 3,
    },
    1260: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      spaceBetween: 80,
    }
  },
}

export let swiper = new Swiper(slider, options)
checkBullets()



// filter
const categoryClass = '.projects__categories-btn'
const categories = document.querySelectorAll(categoryClass)
const oldDisplay = getComputedStyle( swiper.slides[0] ).display

categories.forEach(category => {
  category.addEventListener('click', (e) => {
    if ( e.target.parentNode.classList.contains('active')) return

    categories.forEach(category => {
       if ( category.parentNode.classList.contains('active') )
        category.parentNode.classList.remove('active')
    })

    const filter = e.target.getAttribute('data-value')
    e.target.parentNode.classList.add('active')

    filterByClass(filter)
  })
})

function filterByClass(filter){
  const slides = swiper.slides

  if ( filter === 'all' )
    slides.forEach(slide => {
      if ( slide.style.display === oldDisplay ) return

      slide.style.display = oldDisplay
    })
  else
    slides.forEach(slide => {
      if ( slide.classList.contains(filter) ) {
        if ( slide.style.display === oldDisplay ) return

        slide.style.display = oldDisplay
      }
      else {
        if ( slide.style.display === 'none' ) return
        slide.style.display = 'none'
      }
    })

  swiper.update()

  checkBullets()
}


function checkBullets() {
  const sliderBulletsWrapper = document.querySelector('.swiper-pagination-bullets')

  if ( sliderBulletsWrapper.children.length < 5 ) {
    sliderBulletsWrapper.classList.remove('swiper-pagination-bullets-dynamic')
    sliderBulletsWrapper.style.width = '115px'
  }
  else {
    sliderBulletsWrapper.classList.add('swiper-pagination-bullets-dynamic')
  }

  swiper.slideTo(0)
  swiper.slideTo(1)
  swiper.slideTo(0)
}

swiper.on('breakpoint', function (swiper) {
  swiper.update()

  checkBullets()
})

const slides = swiper.slides


slides.forEach(slide => {
  slide.addEventListener('click', e => {
    slide.classList.toggle('description-open')
  })
})