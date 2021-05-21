require("dotenv").config();

const  express = require('express');
const app = express();
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')
const session = require('express-session')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
  }));

app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')
app.use('/public', express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))

app.use(session({
  secret: 'abacaxiselvagem',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.get('/', (req, res) =>{
  res.render('home');
})

/*
app.get('/login', (req, res) =>{
  const user = !!req.session.token
  
  res.render('home', { user });
})*/

require('./controllers/projectController')(app);
require('./controllers/authController')(app);

app.listen(process.env.PORT || 3000);