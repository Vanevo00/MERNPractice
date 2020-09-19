const express = require ('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const User = require('../models/User')

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

module.exports = router
