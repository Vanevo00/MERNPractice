const express = require('express')
const connectDB = require('./utils/connectDB')

const port = process.env.PORT || 5555

const app = express()

connectDB()

app.get('/', (req, res) => res.send('welcome'))

app.listen(port, () => console.log(`app listening at port ${port}`))
