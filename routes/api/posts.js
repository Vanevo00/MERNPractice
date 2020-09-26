const express = require ('express')
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

    const post = await Post.findById(postId)

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

// @route POST api/posts/like/:id
// @desc Like post
// @access private
router.post('/like/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const {
      user: {
        id: userId
      },
      params: {
        id: postId
      }
    } = req

    const post = await Post.findById(postId)

    if (!post) res.status(404).json({ nopostfound: 'no post with that id found.'})

    const userAlreadyLikedPost = () => post.likes.filter((like) => like.user.toString() === userId).length > 0

    if (userAlreadyLikedPost()) return res.status(400).json({ alreadyliked: 'user already liked this post'})

    post.likes.push({ user: userId })
    await post.save()
    res.json(post)
  } catch(err) {
    console.log(err)
  }
})

// @route POST api/posts/unlike/:id
// @desc Unlike post
// @access private
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const {
      user: {
        id: userId
      },
      params: {
        id: postId
      }
    } = req

    const post = await Post.findById(postId)

    if (!post) res.status(404).json({ nopostfound: 'no post with that id found.'})

    console.log("userId", userId)

    const userDidNotLikePost = () => post.likes.filter((like) => like.user.toString() === userId).length === 0

    if (userDidNotLikePost()) res.status(400).json({ didnotlike: 'user did not like this post'})

    post.likes = post.likes.filter((like) => {
      console.log('like.user', like.user)
      console.log('userId', userId)

      return like.user.toString() !== userId
    })
    console.log("post.likes", post.likes)
    await post.save()
    res.json(post)
  } catch(err) {
    console.log(err)
  }
})

// @route POST api/posts/comment/:id
// @desc Add comment to post
// @access private
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { errors, isValid } = validatePostInput(req.body)
  if (!isValid) return res.status(400).json(errors)

  try {
    const {
      params: {
        id
      },
      body: {
        text,
        name,
        avatar,
      },
      user: {
        id: userId
      }
    } = req

    const post = await Post.findById(id)

    if (!post) return res.status(404).json({ nopostfound: 'no post with that id found' })

    const newComment = {
      text,
      name,
      avatar,
      user: userId
    }

    post.comments.push(newComment)
    await post.save()
    res.json(post)
  } catch(err) {
    console.log(err)
  }
})

// @route DELETE api/posts/comment/:id/:commentId
// @desc Delete a comment of a post
// @access private
router.delete('/comment/:id/:commentId', passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const {
      params: {
        id,
        commentId
      },
      user: {
        id: userId
      }
    } = req

    const post = await Post.findById(id)
    if (!post) return res.status(404).json({ nopostfound: 'no post with that id found' })

    const selectedCommentArr = post.comments.filter((comment) => commentId === comment._id.toString())
    if (selectedCommentArr.length < 1) return res.status(404).json({ nocommentfound: 'no comment with that id found' })
    if (selectedCommentArr[0].user.toString() !== userId) return res.status(401).json({ unauthorized: 'unauthorized to delete this comment' })

    post.comments = post.comments.filter((comment) => commentId !== comment._id.toString())
    await post.save()
    res.json({ success: true })
  } catch(err) {
    console.log(err)
  }
})

module.exports = router
