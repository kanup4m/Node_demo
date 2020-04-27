const mongoose = require('mongoose')
const model = mongoose.Schema
const signup = new model({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
    },
    password: {
        type: String,
        required: [true, 'Email is required']
    }

})
const Signup = mongoose.model('Signup', signup)
module.exports = Signup