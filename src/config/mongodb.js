const mongoose = require('mongoose')
require('dotenv').config()

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_MONGOURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        console.log('Mongodb database is successfully connected!')
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectDB