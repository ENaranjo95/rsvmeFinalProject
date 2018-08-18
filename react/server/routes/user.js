const express = require('express')
const router = express.Router()
const User = require('../database/models/user')
const passport = require('../passport')

router.post('/signup', (req, res) => {

    const { first, last, email, phone, password } = req.body
    // ADD VALIDATION
    User.findOne({ email: email }, (err, user) => {
        if (err) {
        } else if (user) {
            res.json({
                error: `Sorry, there's already an account with this email: ${email}`
            })
        }
        else {
            const newUser = new User({
                first: first,
                last: last,
                email: email,
                phone: phone,
                password: password
            })
            newUser.save((err, savedUser) => {
                if (err) return res.json(err)
                res.json(savedUser)
            })
        }
    })
})

router.post('/login', (req, res, next) => {
        next()
    },
    passport.authenticate('local'),
    (req, res) => {
      let {first, last, email, phone} = req.user
        var userInfo = {
          first: first,
          last: last,
          email: email,
          phone: phone,
        };
        res.send(userInfo);
    }
)

router.get('/', (req, res, next) => {
    console.log('===== user!!======')
    console.log(req.user)
    if (req.user) {
        res.json({ user: req.user })
    } else {
        res.json({ user: null })
    }
})


router.post('/logout', (req, res) => {
    if (req.user) {
        req.logout()
        res.send({ msg: 'logging out' })
    } else {
        res.send({ msg: 'no user to log out' })
    }
})

module.exports = router
