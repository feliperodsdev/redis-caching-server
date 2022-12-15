require('dotenv').config()
const mongoose = require('mongoose')
const connectDb = () => 
{
    return mongoose.connect(process.env.URL_DB)
}

module.exports = connectDb