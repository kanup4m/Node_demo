const express = require('express')
const route = require('./Routes/routes')
const parser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const uri = 'mongodb+srv://michael:michael123@cluster0-oipe7.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000
}).catch(err => console.log(err.reason));
// mongoose.connect('mongodb + srv://michael:1U8LdUzztkU5v5sq@cluster0-oipe7.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = global.Promise
app.use(parser.json())
app.use(route)
const port = process.env.port || 4000;
app.listen(port, console.log('Listening on port', port))