const express = require('express')
const connectDB = require('./utils/connectDB')
const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')
const bodyParser = require('body-parser')
const passport = require('passport')

const port = process.env.PORT || 5555

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(passport.initialize())

require('./config/passport')(passport)

connectDB()

app.get('/', (req, res) => res.send('welcome'))

app.use('/api/users', users)
app.use('/api/profile', profile)
app.use('/api/posts', posts)

app.listen(port, () => console.log(`app listening at port ${port}`))
