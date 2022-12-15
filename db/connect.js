const mongoose = require('mongoose')

const connectDb = () => 
{
    var connection = mongoose.connect(process.env.URL_DB)
    return connection
}

module.exports = connectDb