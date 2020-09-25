const express = require ('express')
const mongoose = require('mongoose')
const passport = require('passport')
const Post = require('../models/Post')
const validatePostInput = require('../../validation/post')

const router = express.Router()

// @route GET api/posts/test
// @desc test route
// @access public
router.get('/test', (req, res) => res.json({
  message: 'test successful'
}))

// @route Post api/posts
// @desc create a post
// @access private
router.post('/', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { errors, isValid } = validatePostInput(req.body)
  if (!isValid) return res.status(400).json(errors)

  try {
    const {
      body: {
        text,
        name,
        avatar
      },
      user: {
        id
      }
    } = req

    const newPost = new Post({
      text,
      name,
      avatar,
      user: id
    })

    await newPost.save()
    res.json(newPost)
  } catch(err) {
    console.log(err)
  }
})

module.exports = router
