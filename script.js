const burguer = document.querySelector('.burguer')
const nav = document.querySelector('.nav-links')
const navLinks = document.querySelectorAll('.nav-links li')
const header = document.getElementById('header');
// Get the offset position of the navbar
var sticky = header.offsetTop;
// Viewport width
const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)

// Closes nav menu after clicking on a link
navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        if (vw <= 900) {
            nav.classList.remove('nav-active')
            burguer.classList.toggle('toggle')
            animateLinks()
        } else {
            return
        }
    })
})

// Handles nav menu functionality
const navSlide = () => {
    burguer.addEventListener('click',  () => {
        // Toggle nav visibility
        nav.classList.toggle('nav-active')
        // Burguer animation
        burguer.classList.toggle('toggle')
        // Start navLinks animation
        animateLinks()
    })
}

// Animate nav links
const animateLinks = () => {
    navLinks.forEach((link, index) => {
        // Fix navLinks visibility after 1st use
        if (link.style.animation) {
            link.style.animation = ''
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`
        }
    })
}

// Adds and removes the header shadow
const addShadowToHeader = () => {
  if (window.pageYOffset > sticky) {
    header.classList.add("sticky");
  } else {
    header.classList.remove("sticky");
  }
}

// Animation for mobile view
navSlide()

// Get breakpoint to trigger shadow under the header
window.onscroll = function() {
    addShadowToHeader()
};
