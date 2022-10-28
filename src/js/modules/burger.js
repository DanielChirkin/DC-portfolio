
export class Burger {
  constructor({header, contacts, burgerElements, robot, robotImg, burger, activeClass, followClass}) {
    this.header = document.querySelector(header)
    this.contacts = document.querySelector(contacts)
    this.burgerElements = document.querySelectorAll(burgerElements)
    this.robot = document.querySelector(robot)
    this.robotImg = document.querySelector(robotImg)
    this.burger = document.querySelector(burger)
    this.activeClass = activeClass
    this.followClass = followClass
    this.observerHeaderOptions = {
      root: null, // viewport
      threshold: 0.9,
    }
    this.observerContactsOptions = {
      root: null, // viewport
      threshold: 0.5,
    }
  }
  addEvent(element) {
    element.addEventListener('click', (e) => {
      if ( getComputedStyle(this.burger).display === 'none' ) return

      if ( this.robot.classList.contains('contacts-open') && !e.target.classList.contains('svg-robot-dims')  ) return


      if ( e.target.classList.contains('svg-robot-dims') && !this.robot.classList.contains(this.followClass) ) {
        if ( this.robot.classList.contains('contacts') ) {
          this.robot.classList.toggle('contacts-open')

          if ( this.robot.classList.contains('contacts-open') )
          this.robotImg.setAttribute('src', './images/sprites/sprite.svg#robot-look-left')
          else
          this.robotImg.setAttribute('src', './images/sprites/sprite.svg#robot-mail')

          return
        }

        this.robot.classList.toggle(this.followClass)
        this.robotImg.setAttribute('src', './images/sprites/sprite.svg#robot-burger')
        return
      }
  
      this.header.classList.toggle(this.activeClass)
      document.body.classList.toggle('no-scroll')
    })
  }
  addListenersToElements() {
    this.burgerElements.forEach((element) => {
      this.addEvent(element)
    })
  }
  observeHeaderCallback(burger, robot, robotImg, followClass) {
    return function(entries, observer) {
      entries.forEach(function(entry) {

        if ( getComputedStyle(burger).display === 'none' ) return
        
        if ( !document.isLoaded && !entry.isIntersecting ) {
          robot.classList.toggle(followClass)
          robotImg.setAttribute('src', './images/sprites/sprite.svg#robot-burger')
        }
    
        if ( !document.isLoaded ) return

        if ( !entry.isIntersecting && robot.classList.contains(followClass) ) return
        
        robot.classList.toggle(followClass)
        
        if (robot.classList.contains(followClass))
        robotImg.setAttribute('src', './images/sprites/sprite.svg#robot-burger')
        else
        robotImg.setAttribute('src', './images/sprites/sprite.svg#robot')
      })
    }
  }
  observeContactsCallback(burger, robot, robotImg, followClass) {
    return function(entries, observer) {
      entries.forEach((entry) => {

        if ( getComputedStyle(burger).display === 'none' ) return

        if ( !document.isLoaded && !entry.isIntersecting ) return

        
        if ( entry.isIntersecting ) {
          robot.classList.toggle(followClass)
          robot.classList.add('contacts')
          robotImg.setAttribute('src', './images/sprites/sprite.svg#robot-mail')
        }
        else {
          robot.classList.add(followClass)
          robot.classList.remove('contacts')
          robot.classList.remove('contacts-open')
          robotImg.setAttribute('src', './images/sprites/sprite.svg#robot-burger')
        }

      })
    }
  }
  getHeaderObserver() {
    return new IntersectionObserver(this.observeHeaderCallback(
      this.burger,
      this.robot,
      this.robotImg,
      this.followClass
    ), 
    this.observerHeaderOptions)
  }
  getContactsObserver() {
    return new IntersectionObserver(this.observeContactsCallback(
      this.burger,
      this.robot,
      this.robotImg,
      this.followClass
    ), 
    this.observerContactsOptions)
  }
  init() {
    this.addListenersToElements()

    const headerObserver = this.getHeaderObserver()
    headerObserver.observe(this.header)

    const contactsObserver = this.getContactsObserver()
    contactsObserver.observe(this.contacts)
  }
}