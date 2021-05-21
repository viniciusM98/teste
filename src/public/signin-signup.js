const email = document.querySelector('#email-su')
const password = document.querySelector('#password-su')
const sign_up_btn = document.querySelector('#sign-up-btn')
const button_register = document.querySelector('#button-su')
const button_login = document.querySelector('#button-login')
const message_loged = document.querySelector('#signin-signup')
const containerLogin = document.querySelector(".container-login")
const materialize_visible = document.querySelector(".materialize-visualization")
const login_visible = document.querySelector(".login-visualization")
const sign_out_btn = document.querySelector(".github-button")

if(sessionStorage.getItem('token')){
  materialize_visible.classList.remove("materialize-visualization")
  materialize_visible.classList.add("materialize-visualization-true")
  login_visible.classList.remove("login-visualization")
  login_visible.classList.add("login-visualization-false")
}

sign_up_btn.addEventListener('click', () => {
  containerLogin.classList.add('sign-up-mode')
})

sign_out_btn.addEventListener('click', () => {
  sessionStorage.removeItem('token')
  materialize_visible.classList.add("materialize-visualization")
  materialize_visible.classList.remove("materialize-visualization-true")
  login_visible.classList.add("login-visualization")
  login_visible.classList.remove("login-visualization-false")
})

button_register.addEventListener('click', (event) => {
  event.preventDefault()

  axios.post('https://materializecopy.herokuapp.com/auth/register', {
    email: email.value,
    password: password.value
  })
  .then(res => {
    console.log(res.status)
    if(res.status === 200){
      createLineLogin("Cadastrado realizado com sucesso!")
      containerLogin.classList.remove('sign-up-mode')
    }
  })
})

button_login.addEventListener('click', async(event) => {
  event.preventDefault()
  console.log("login")

  let email_login = document.querySelector('#user-login')
  let passw = document.querySelector('#password-login')

  console.log(email_login.value, passw.value)

  await axios.post('/auth/authenticate', {
      email: email_login.value,
      password: passw.value
    })
    .then(res => {
      console.log(res.status)
      if(res.status === 200){
        console.log("entrei")
        createLineLogin("Logado com sucesso!")
        sessionStorage.setItem('token', res.data.token)
        materialize_visible.classList.remove("materialize-visualization")
        materialize_visible.classList.add("materialize-visualization-true")
        login_visible.classList.remove("login-visualization")
        login_visible.classList.add("login-visualization-false")
      } 
    })
    .catch(err => {
      createLineLogin("ERRO!")
    })
})

function createLineLogin(value) {
  let line = document.createElement('p')
  let text = document.createTextNode(value)

  line.classList.add("center-p")

  line.appendChild(text)
  message_loged.appendChild(line)
}