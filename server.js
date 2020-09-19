const express = require('express')

const app = express()
const port = process.env.PORT || 5555

app.get('/', (req, res) => res.send('welcome'))

app.listen(port, () => console.log(`app listening at port ${port}`))
