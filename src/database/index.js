require('dotenv').config()

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://deploy:u31BTApnk6zysR4r@cluster0.by2mx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;