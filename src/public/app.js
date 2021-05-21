const button = document.querySelector('#search-btn')
const buttonClose = document.querySelector('#close-button')
const countryField = document.querySelector('#input-zip')
const content = document.querySelector('#zip-code-modal .modal-main')
const title = document.querySelector('#zip-code-modal .modal-title')
const button_post = document.querySelector('#post-button')
const advertising = document.querySelector(".advertising")

const country_field = document.querySelector('#country')
const confirmed_field = document.querySelector('#confirmed')
const recovered_field = document.querySelector('#recovered')
const deaths_field = document.querySelector('#deaths')

const search_pubs = document.querySelector('#search-btn')

const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

button_post.addEventListener('click', async(event) => {
  event.preventDefault();

  console.log('entrei aqui')
  await axios.post('https://teste-materialize.herokuapp.com/user/post', {
    country: country_field.value,
    confirmed: confirmed_field.value,
    recovered: recovered_field.value,
    deaths: deaths_field.value
  })
  .then(res => {
    console.log(res.status)
    
    if(res.status === 200){
      country_field.value = ''
      confirmed_field.value = ''
      recovered_field.value = ''
      deaths_field.value = ''
    }else{
      country_field.innerHTML = ''
      confirmed_field.innerHTML = ''
      recovered_field.innerHTML = ''
      deaths_field.innerHTML = ''
      createLinePub("ERRO!")
    }
  }).catch(err => {
    country_field.value = ''
    confirmed_field.value = ''
    recovered_field.value = ''
    deaths_field.value = ''
    createLinePub("Pais ja cadastrado")
  })
})

openModalButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    event.preventDefault();
    const modal = document.querySelector(button.dataset.modalTarget)
    openModal(modal)
  })
})

overlay.addEventListener('click', () => {
  const modals = document.querySelectorAll('.zip-code-modal.active')
  modals.forEach(modal => {
    closeModal(modal)
  })
})

closeModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.zip-code-modal')
    closeModal(modal)
  })
})

function openModal(modal) {
  adicionaDados()
  if(modal == null) return
  modal.classList.add('active')
  overlay.classList.add('active')
}

function closeModal(modal) {
  if(modal == null) return
  modal.classList.remove('active')
  overlay.classList.remove('active')
}

function adicionaDados() { 
  let country = countryField.value
  let ctry = document.createElement('h1')

  country = country[0].toUpperCase() + country.substr(1)
  country = country.trim()

  //let countryLower = country.toLowerCase()

  let txt = document.createTextNode(country)

  console.log(country, country[0])
  title.innerHTML = ''
  ctry.appendChild(txt)
  title.appendChild(ctry)

  if(country.length > 3){

    console.log(country.toLowerCase())
    axios.post('https://teste-materialize.herokuapp.com/user/busca', {
        country: country.toLowerCase()
    })
    .then(res => {
      content.innerHTML = ''
      createLine(`País: ${res.data.country}`)
      createLine(`Casos confirmados: ${res.data.confirmed}`)
      createLine(`Casos Recuperados: ${res.data.recovered}`)
      createLine(`Mortes: ${res.data.deaths}`)
    })
    .catch(err => {
      content.innerHTML = ''
      createLine('ERRO!')
    })
  }else{
    createLine("Campo vazio ou com menos de três caracteres!!")
  }
  
}

function createLine(value) {
  let line = document.createElement('p')
  let text = document.createTextNode(value)

  line.appendChild(text)
  content.appendChild(line)
}

function createLinePub(value){
  let line = document.createElement('p')
  let text = document.createTextNode(value)

  line.appendChild(text)
  advertising.appendChild(line)
}