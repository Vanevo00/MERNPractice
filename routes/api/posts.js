const express = require ('express')
const mongoose = require('mongoose')
const passport = require('passport')
const Post = require('../models/Post')
const Profile = require('../models/Profile')
const validatePostInput = require('../../validation/post')

const router = express.Router()

// @route GET api/posts/test
// @desc test route
// @access public
router.get('/test', (req, res) => res.json({
  message: 'test successful'
}))

// @route GET api/posts
// @desc get posts
// @access public
router.get('/', async (req, res) => {
  try {
    const posts = await Post
      .find()
      .sort({ date: -1 })
    if (!posts) res.status(404).json({ nopostsfound: 'no posts found.' })
    res.json(posts)
  } catch(err) {
    console.log(err)
  }
})

// @route GET api/posts/:id
// @desc get post by id
// @access public
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) res.status(404).json({ nopostfound: 'no post with that id found.' })
    res.json(post)
  } catch(err) {
    console.log(err)
  }
})

// @route POST api/posts
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

// @route DELETE api/posts/:id
// @desc delete post with id
// @access private
router.delete('/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const {
      user: {
        id: userId
      },
      params: {
        id: postId
      }
    } = req

    const [profile, post] = await Promise.all([
      Profile.findOne({ user: userId }),
      Post.findById(postId)
    ])

    if (!post) res.status(404).json({ nopostfound: 'no post with that id found.'})

    if (post.user.toString() !== userId) {
      res.status(401).json({ notauthorized: 'user not authorized'})
    }

    await post.remove()
    res.json({ success: true })
  } catch(err) {
    console.log(err)
  }


})

module.exports = router
