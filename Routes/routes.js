const express = require('express')
const Signup = require('../Model/signup')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../Middleware/Auth')
const router = express.Router();
router.post('/signup', (req, res, next) => {
    Signup.findOne({ name: req.body.name })
        .then(user => {
            if (user !== null) {
                res.status(403).send({
                    message: "User already exist"
                })
            }
            else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        res.status(403).send({
                            message: err
                        })
                    }
                    if (hash) {
                        const user = new Signup({
                            name: req.body.name,
                            email: req.body.email,
                            password: hash
                        });
                        user.save()
                            .then(user => {
                                res.status(200).send({
                                    message: "User Created",
                                    detail: user
                                })
                            })
                            .catch(err => {
                                res.status(408).send({
                                    message: "Internal error Occured",
                                    error: err
                                })
                            })
                    }
                })
            }
        })
        .catch()
})
router.post('/login', (req, res) => {
    Signup.findOne({ name: req.body.name }).then(user => {
        if (user !== null) {
            bcrypt.compare(req.body.password, user.password, (error, response) => {
                if (error) {
                    console.log('error')
                    res.status(401).send({
                        message: "Invalid password",
                    })
                }
                if (response) {
                    const token = jwt.sign({
                        name: user.name,
                        userId: user._id
                    }, 'secret',
                        {
                            expiresIn: '1h'
                        });

                    res.status(200).send({
                        message: "Logged In",
                        token: token
                    })
                }
            })
        }
        if (user == null) {
            res.status(401).send({
                message: "User not found"
            })
        }
    }).catch(error => {
        res.status(403).send({
            message: "Error Occurred",
            error: error
        })
    })
})
router.get('/user', auth, (req, res) => {
    console.log(req.userData)
    res.send({
        message: `Welcome ${req.userData.name}. Your Id is ${req.userData.userId}`
    })
})
router.put('/user/:id', (req, res) => {
    res.send('Update page')
})
router.delete('/user/:id', (req, res) => {
    res.send("Delete Page")
})
module.exports = router

