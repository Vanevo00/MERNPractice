const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const validateProfileInput = require('../../validation/profile')

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

    const foundProfile = await Profile.findOne({ user: id }).populate('user', ['name', 'avatar'])
    if (!foundProfile) {
      errors.noprofile = 'There is no profile for this user'
      return res.status(404).json(errors)
    }

    res.json(foundProfile)
  } catch(err) {
    console.error(err)
  }
})

// @route GET api/profile/all
// @desc get all profiles
// @access public
router.get('/all', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar'])
    const errors = {}

    if (!profiles) {
      errors.noprofile = 'There are no profiles'
      return res.status(404).json(errors)
    }

    res.json(profiles)
  } catch(err) {
    console.error(err)
  }
})

// @route GET api/profile/user/:id
// @desc get profile by user id
// @access public
router.get('/user/:id', async (req, res) => {
  try {
    const {
      params: {
        id
      }
    } = req

    const errors = {}

    const foundProfile = await Profile.findOne({ user: id }).populate('user', ['name', 'avatar'])
    if (!foundProfile) {
      errors.noprofile = 'There is no profile for this user'
      res.status(404).json(errors)
    }

    res.json(foundProfile)

  } catch(err) {
    console.errror(err)
  }
})

// @route GET api/profile/handle/:handle
// @desc get profile by handle
// @access public
router.get('/handle/:handle', async (req, res) => {
  try {
    const {
      params: {
        handle
      }
    } = req

    const errors = {}

    const foundProfile = await Profile.findOne({ handle }).populate('user', ['name', 'avatar'])
    if (!foundProfile) {
      errors.noprofile = 'There is no profile for this user'
      res.status(404).json(errors)
    }

    res.json(foundProfile)

  } catch(err) {
    console.error(err)
  }
})

// @route POST api/profile/
// @desc create or edit user profile
// @access private
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { errors, isValid } = validateProfileInput(req.body)
  if (!isValid) return res.status(400).json(errors)

  try {
    const {
      user: {
        id
      },
      body: {
        handle,
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        twitter,
        linkedin,
        facebook,
        instagram
      }
    } = req

    const profileFields = {}
    profileFields.user = id

    if (handle) profileFields.handle = handle
    if (company) profileFields.company = company
    if (website) profileFields.website = website
    if (location) profileFields.location = location
    if (bio) profileFields.bio = bio
    if (status) profileFields.status = status
    if (githubusername) profileFields.githubusername = githubusername
    if (skills) profileFields.skills = skills.split(',')
    profileFields.social = {}
    if (youtube) profileFields.social.youtube = youtube
    if (twitter) profileFields.social.twitter = twitter
    if (facebook) profileFields.social.facebook = facebook
    if (linkedin) profileFields.social.linkedin = linkedin
    if (instagram) profileFields.social.instagram = instagram

    const foundProfile = await Profile.findOne({ user: id })
    if (foundProfile) {
      const updatedProfile = await foundProfile.update(
        { $set: profileFields },
        { new: true }
      )
      res.json(updatedProfile)
    } else {
      const profileHandleFound = await Profile.findOne({ handle: profileFields.handle })
      if (profileHandleFound) {
        errors.handle = 'Handle already exists'
        res.status(400).json(errors)
      }

      const createdProfile = await new Profile(profileFields)
      createdProfile.save()
      res.json(createdProfile)
    }

  } catch(err) {
    console.error(err)
  }
})

module.exports = router
