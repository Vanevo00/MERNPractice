const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')

const Profile = require('../models/Profile')
const User = require('../models/User')

const router = express.Router()

// @route GET api/profile/test
// @desc test route
// @access public
router.get('/test', (req, res) => res.json({
  message: 'test successful'
}))

// @route GET api/profile/
// @desc fetch current user's profile
// @access private
router.get('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const {
      user: {
        id
      }
    } = req

    const errors = {}

    const foundProfile = await Profile.findOne({ user: id })
    if (!foundProfile) {
      errors.noprofile = 'There is no profile for this user'
      return res.status(404).json(errors)
    }

    res.json(foundProfile)
  } catch(err) {
    console.error(err)
  }
})

module.exports = router
