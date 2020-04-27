const express = require('express')
const route = require('./Routes/routes')
const parser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
mongoose.connect('mongodb://localhost/create', { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = global.Promise
app.use(parser.json())
app.use(route)
const port = process.env.port || 4000;
app.listen(port, console.log('Listening on port', port))