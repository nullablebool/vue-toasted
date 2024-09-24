export default {
  animateIn: (el) => {
    el.classList.add('animate', 'in')

    // el.style.opacity = 1
  },
  animateOut: (el, onComplete) => {
    el.classList.add('animate', 'out')
    el.addEventListener('transitionend', function handler() {
      onComplete()
      el.removeEventListener('transitionend', handler)
    })
  },
  animateOutBottom: (el, onComplete) => {
    el.classList.add('animate', 'out-bottom')
    el.addEventListener('transitionend', function handler() {
      onComplete()
      el.removeEventListener('transitionend', handler)
    })
  },
  animateReset: (el) => {
    el.classList.add('animate', 'reset')
  },
  animatePanning: (el, left, opacity) => {
    el.style.left = left + 'px'
    el.style.opacity = opacity
  },
  animatePanEnd: (el, onComplete) => {
    el.classList.add('animate', 'out')
    el.addEventListener('transitionend', function handler() {
      onComplete()
      el.removeEventListener('transitionend', handler)
    })
  },
  clearAnimation: (toasts) => {
    toasts.forEach((t, index) => {
      setTimeout(() => {
        t.el.classList.add('animate', 'out')
        t.el.addEventListener('transitionend', function handler() {
          t.remove()
          t.el.removeEventListener('transitionend', handler)
        })
      }, index * 150) // stagger animations
    })
  },
}
