var site = document.querySelector('.site')
var trigger = document.querySelector('.trigger')
var reveal = document.querySelector('.mainNav')
var menuitems = reveal.querySelectorAll('mainNav-menu a')
var menuarray = Array.apply(null, menuitems)
var screenReaderText = document.querySelector('.trigger .screen-reader-text')

// Toggle reveal class on body element, set aria-expanded and screen reader text on trigger:
function revealMenu () {
  site.classList.toggle('reveal')
  reveal.classList.add('open')
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
    reveal.classList.remove('open')
  }
}

// Hide nav area when touch or click happens elsewhere:
function clickTarget (e) {
  if (trigger.getAttribute('aria-expanded') === 'true' && !reveal.contains(e.target)) {
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
