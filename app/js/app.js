(function () {
  const site = document.querySelector('.site')
  const trigger = document.querySelector('.trigger')
  const nav = document.querySelector('.mainNav')
  const menuitems = nav.querySelectorAll('mainNav-menu a')
  const menuarray = Array.apply(null, menuitems)
  let screenReaderText = document.querySelector('.trigger .screen-reader-text')

  // Contact form
const form = document.getElementById('contactForm')
const submit = document.getElementById('submit')
const modal = document.getElementById('modal-one')

form.addEventListener('submit', submitForm)

function submitForm (e) {
  e.preventDefault()
  console.log('Gracias!')
}


  // Sticky nav
  let pinned = false
  let stickyScrollPoint = document.querySelector('.header').offsetHeight

  function pinToTop () {
    if (pinned) return

    nav.classList.add('pinned')
    pinned = true
  }

  function unPinFromTop () {
    if (!pinned) return

    nav.classList.remove('pinned')
    pinned = false
  }

  window.addEventListener('scroll', function (ev) {
    if (window.scrollY < stickyScrollPoint) return unPinFromTop()
    let coords = nav.getBoundingClientRect()
    if (coords.top <= 0) return pinToTop()

    unPinFromTop()
  })

  // Toggle reveal class on body element, set aria-expanded and screen reader text on trigger:
  function revealMenu () {
    site.classList.toggle('reveal')
    nav.classList.add('open')
    trigger.getAttribute('aria-expanded') === 'false' ? trigger.setAttribute('aria-expanded', true) : trigger.setAttribute('aria-expanded', false)
    screenReaderText.innerHTML === 'Reveal menu' ? screenReaderText.innerHTML = 'Hide menu' : screenReaderText.innerHTML = 'Reveal menu'
  }

  // Hide nav area when focus shifts away:
  function catchFocus () {
    if (trigger.getAttribute('aria-expanded') === 'true' && !(menuarray.includes(document.activeElement) || document.activeElement === trigger)) {
      revealMenu()
    } else {
      return
    }
  }

  function removeMenu () {
    if (trigger.getAttribute('aria-expanded') === 'false') {
      nav.classList.remove('open')
    }
  }

  // Hide nav area when touch or click happens elsewhere:
  function clickTarget (e) {
    if (trigger.getAttribute('aria-expanded') === 'true' && !nav.contains(e.target)) {
      revealMenu()
    }
  }

  // Listen for clicks on trigger button:
  trigger.addEventListener('click', revealMenu, false)

  // Listen for focus changes:
  site.addEventListener('focusin', catchFocus, true)

  // Listen for clicks:
  site.addEventListener('click', function (e) { clickTarget(e) }, true)
  site.addEventListener('transitionend', removeMenu, false)
})()
