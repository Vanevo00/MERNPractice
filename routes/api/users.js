const express = require ('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')

// @route GET api/users/test
// @desc test route
// @access public
router.get('/test', (req, res) => res.json({
  message: 'test successful'
}))

// @route POST api/users/register
// @desc register a user
// @access public
router.post('/register', async(req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body)
  if (!isValid) return res.status(400).json(errors)

  const {
    body: {
      name,
      email,
      password
  }
  } = req

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    errors.email = 'Email already exists'
    return res.status(400).json(errors)
  }

  const avatar = gravatar.url(email, {
    s: '200',
    r: 'pg',
    d: 'mm'
  })

  const newUser = new User({
    name,
    email,
    avatar,
    password
  })

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, async (err, hash) => {
      if (err) throw err
      newUser.password = hash
      try {
        await newUser.save()
        res.json(newUser)
      } catch(err) {
        console.error(err)
      }
    })
  })
})

// @route POST api/users/login
// @desc login a user, return the JWT token
// @access public
router.post('/login', async (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body)
  if (!isValid) return res.status(400).json(errors)

  const {
    body: {
      email,
      password
    }
  } = req

  const foundUser = await User.findOne({ email })
  if (!foundUser) {
    errors.email = 'User not found'
    return res.status(404).json(errors)
  }

  const passwordsMatch = await bcrypt.compare(password, foundUser.password)
  if (passwordsMatch) {
    const payload = {
      id: foundUser.id,
      name: foundUser.name,
      avatar: foundUser.avatar
    }

    jwt.sign(payload, keys.jwtSecret, { expiresIn: 3600 * 24 }, (err, token) => {
      res.json({
        success: true,
        token: `Bearer ${token}`
      })
    })
  } else {
    errors.password = 'Incorrect password'
    return res.status(400).json(errors)
  }
})


// @route GET api/users/current
// @desc Return current user
// @access private
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  const {
    user: {
      id,
      name,
      email
    }
  } = req

  res.json({
    id,
    name,
    email
  })
})

module.exports = router
