const express = require ('express')

const router = express.Router()

// @route GET api/posts/test
// @desc test route
// @access public
router.get('/test', (req, res) => res.json({
  message: 'test successful'
}))

module.exports = router