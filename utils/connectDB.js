const mongoose = require('mongoose')
const db = require('../config/keys').mongoURI

module.exports = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('MongoDB connected!')
  } catch(err) {
    console.error(err)
  }
}
