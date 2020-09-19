const express = require ('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')

// @route GET api/users/test
// @desc test route
// @access public
router.get('/test', (req, res) => res.json({
  message: 'test successful'
}))

// @route GET api/users/register
// @desc register a user
// @access public
router.post('/register', async(req, res) => {
  const {
    body: {
      name,
      email,
      password
  }
  } = req

  const existingUser = await User.findOne({ email })
  if (existingUser) return res.status(400).json({ email: 'Email already exists' })

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

// @route GET api/users/login
// @desc login a user, return the JWT token
// @access public
router.post('/login', async (req, res) => {
  const {
    body: {
      email,
      password
    }
  } = req

  const foundUser = await User.findOne({ email })
  if (!foundUser) return res.status(404).json({ email: 'User not found' })

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
    return res.status(400).json({ password: 'Incorrect' })
  }
})

module.exports = router
