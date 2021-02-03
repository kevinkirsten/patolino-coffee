const API_URL = 'https://api.polijunior.com.br/produtos'

const burguer = document.querySelector('.burguer')
const nav = document.querySelector('.nav-links')
const navLinks = document.querySelectorAll('.nav-links li')
const header = document.getElementById("header");
const productsElement = document.getElementById('products')
// Get the offset position of the navbar
var sticky = header.offsetTop;
// Viewport width
const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)

// Closes nav menu after clicking on a link
navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        if (vw <= 780) {
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

// Get breakpoint to trigger shadow under the header
window.onscroll = function() {
    addShadowToHeader()
};

// HTTP requisition
async function getCoffees(url) {
    const res = await fetch(url)
    const data = await res.json()
    showCoffees(data)
}

// Adjusts intensity visualization
const setIntensity = (intensity, myClass) => {
    if (intensity >= 1 && intensity < 3) {
        if (myClass === 'c0') {
            return
        } else {
            return 'empty'
        }
    } else if (intensity >= 4 && intensity <= 6) {
        if (myClass === 'c0' || myClass === 'c1') {
            return
        } else {
            return 'empty'
        }
    } else if (intensity >= 7 && intensity <= 9) {
        if (myClass === 'c3' || myClass === 'c4') {
            return 'empty'
        } else {
            return
        }
    } else if (intensity >= 10 && intensity <= 12) {
        if (myClass === 'c4') {
            return 'empty'
        } else  {
            return
        }
    } else if (intensity >= 13 && intensity <= 15) {
        return
    }
}

// Format price string
const setPrice = (price) => {
    auxPrice = price.split('.')
    console.log(auxPrice)
    if (auxPrice[1].length < 2) {
        auxPrice[1] = auxPrice[1] + '0'
    }
    return auxPrice[0] + ',' + auxPrice[1]
}

// Adds each coffe to the page
function showCoffees(coffees) {
    productsElement.innerHTML = ''
    coffees.forEach(coffee => {
        const {id, nome, intensidade, preco, descricao, foto} = coffee

        const coffeeElement = document.createElement('div')
        coffeeElement.classList.add('coffee-container')
        coffeeElement.id = id
        coffeeElement.innerHTML =
        `
          <div class="left">
            <img src="${foto}" alt="Foto de cápsula de café ${nome}" class="foto" />
            <ul class="intensity">
              <li class="c0 ${setIntensity(intensidade, 'c0')}"></li>
              <li class="c1 ${setIntensity(intensidade, 'c1')}"></li>
              <li class="c2 ${setIntensity(intensidade, 'c2')}"></li>
              <li class="c3 ${setIntensity(intensidade, 'c3')}"></li>
              <li class="c4 ${setIntensity(intensidade, 'c4')}"></li>
            </ul>
            <small class="intensity">Intensidade: ${intensidade}</small>
          </div>

          <div class="right">
            <div class="title">
              <img src="./icons/${nome}.svg" alt="${nome}" class="country" />
              <div class="title">${nome}</div>
            </div>
            <p class="description">
              ${descricao}
            </p>
          </div>
          <button id="${nome}-add-cart" class="price">
            R$ ${setPrice(preco)}<i class="fas fa-plus-circle"></i>
          </button>
        `
        productsElement.appendChild(coffeeElement)
    })
}

// Animation for mobile view
navSlide()
// Get Coffees information from API
getCoffees(API_URL)
