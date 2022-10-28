import $ from 'jquery'
import slick from '~/slick-carousel/slick/slick.min.js'

const selector = '[data-projects-slider]'
const prevArrow = '[data-projects-prevArrow]'
const nextArrow = '[data-projects-nextArrow]'
const arrows = '[data-projects-arrows]'
const dots = '[data-projects-dots]'

export const projectsSlider = $(selector).slick( {
  infinite: false,
  slidesToShow: 3,
  slidesToScroll: 3,
  // centerMode: true,
  arrows: true,
  draggable: true,
  dots: true,
  appendDots: dots,
  prevArrow: prevArrow,
  nextArrow: nextArrow,
  initialSlide: 0,
  // lazyLoad: 'ondemand',
  responsive: [
    {
      breakpoint: 900,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        // centerMode: true,
      }
    },
    {
      breakpoint: 630,
      settings: {
        centerMode: true,
        slidesToScroll: 1,
        slidesToShow: 1,
      }
    },
    {
      breakpoint: 500,
      settings: {
        centerMode: false,
        slidesToScroll: 1,
        slidesToShow: 1,
      }
    }
  ]
} )

// filter
const dotsElement = document.querySelector(dots)
const arrowsElement = document.querySelector(arrows)

let transformCount = 0; // for initializeMobileDots
$('.projects__categories-list button').on('click', function() {
  $('.slick-slider').slick('slickGoTo', 0, true)

  const catItem = $(this).parent('.projects__categories-item')
  if ( catItem.hasClass('active') ) return

  const filterClass = $(this).data('value');

  $(selector).slick('slickUnfilter');
  try {
    $(selector).slick('slickFilter', filterClass);
  } catch(e) {
    console.log(e);
  }

  $('.projects__categories-item.active').removeClass('active')
  catItem.addClass('active')

  // dots check
  const dotsList = document.querySelector(`${dots} .slick-dots`)

  if ( dotsList.children.length === 1 ) {
    dotsElement.style.display = 'none'
    arrowsElement.style.display = 'none'
  }
  else {
    dotsElement.style.display = 'flex'
    arrowsElement.style.display = 'flex'
  }
})


// instagram style dots
// based on https://codepen.io/swarad07/pen/xmzQKm?editors=0110

function setBoundries(slick, state) {
  if (state === 'default') {
    slick.find('ul.slick-dots li').eq(4).addClass('n-small-1');
  }
}

// Slick Selector
const slickSlider = $('.slick-slider')
const dotsCon = $(dots)
const maxDots = 5
const transformXIntervalNext = -20
const transformXIntervalPrev = 20

function dotsInit(dots) {
  dots.find('ul.slick-dots').wrap("<div class='slick-dots-container'></div>")
  dots.find('ul.slick-dots li').each(function (index) {
    $(this).addClass('dot-index-' + index)
  })
  dots.find('ul.slick-dots').css('transform', 'translateX(0)')
  setBoundries(dots,'default')
}

let mobileDotsInitialized = false

function initializeMobileDots() {
  const dotsList = document.querySelector(`${dots} .slick-dots`)
  if ( dotsList.children.length < 5) return

  dotsElement.classList.add('mobile')
  

  dotsInit(dotsCon)


  slickSlider.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
    console.log('beforeChange');
    const totalCount = dotsCon.find('.slick-dots li').length
    const slidesToShow = slick.options.slidesToShow

    const dotsContainer = document.querySelector(`${dots} .slick-dots-container`)
    const dotsPar = document.querySelector(`${dots}`)

    console.log('dotsContainer:', dotsContainer);
    console.log('dotsContainer.children.length === 0:', dotsContainer && dotsContainer.children.length === 0);
    if ( dotsContainer && dotsContainer.children.length === 0 ) {
      checkDots()
    }

    if ( !(dotsContainer) && (dotsPar && dotsPar.children.length === 1) ) {
      dotsInit(dotsCon)
    }


    if ( slidesToShow > 1 ) {
      currentSlide = (currentSlide / slidesToShow + 1) - 1
      nextSlide = (nextSlide / slidesToShow + 1) - 1
    }

    if (totalCount > maxDots) {
      if (nextSlide > currentSlide) {
        if (dotsCon.find('ul.slick-dots li.dot-index-' + nextSlide).hasClass('n-small-1')) {
          if (!dotsCon.find('ul.slick-dots li:last-child').hasClass('n-small-1')) {
            transformCount = transformCount + transformXIntervalNext;
            dotsCon.find('ul.slick-dots li.dot-index-' + nextSlide).removeClass('n-small-1')
            const nextSlidePlusOne = nextSlide + 1
            if ( nextSlidePlusOne !== totalCount - 1 )
            dotsCon.find('ul.slick-dots li.dot-index-' + nextSlidePlusOne).addClass('n-small-1')
            dotsCon.find('ul.slick-dots').css('transform', 'translateX(' + transformCount + 'px)')
            const pPointer = nextSlide - 3
            const pPointerMinusOne = pPointer - 1
            dotsCon.find('ul.slick-dots li').eq(pPointerMinusOne).removeClass('p-small-1')
            dotsCon.find('ul.slick-dots li').eq(pPointer).addClass('p-small-1')
          }
        }
      }
      else {
        if (dotsCon.find('ul.slick-dots li.dot-index-' + nextSlide).hasClass('p-small-1')) {
          if (!dotsCon.find('ul.slick-dots li:first-child').hasClass('p-small-1')) {
            transformCount = transformCount + transformXIntervalPrev
            dotsCon.find('ul.slick-dots li.dot-index-' + nextSlide).removeClass('p-small-1')
            const nextSlidePlusOne = nextSlide - 1
            if ( nextSlidePlusOne !== 0 )
            dotsCon.find('ul.slick-dots li.dot-index-' + nextSlidePlusOne).addClass('p-small-1')
            dotsCon.find('ul.slick-dots').css('transform', 'translateX(' + transformCount + 'px)')
            const nPointer = currentSlide + 3
            const nPointerMinusOne = nPointer - 1
            dotsCon.find('ul.slick-dots li').eq(nPointer).removeClass('n-small-1')
            dotsCon.find('ul.slick-dots li').eq(nPointerMinusOne).addClass('n-small-1')
          }
        }
      }
    }

  })

  mobileDotsInitialized = true
}

initializeMobileDots()


function checkDots() {
  const dotsList = document.querySelector(`${dots} .slick-dots`)
  const dotsContainer = document.querySelector(`${dots} .slick-dots-container`)

  if ( dotsContainer && dotsContainer.children.length === 0 )
  dotsContainer.remove()

  if ( dotsList && dotsList.children.length > 5 ) {
    if ( !mobileDotsInitialized )
    initializeMobileDots()

    transformCount = 0
    dotsInit(dotsCon)
  }
}
  