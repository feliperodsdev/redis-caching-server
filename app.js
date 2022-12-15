const express = require('express');
const connectDb = require('./db/connect')

const app = express(); 

const start = () => 
{
    try
    {
        connectDb();
        const port = process.env.PORT || 3000 
        app.listen(port, () => console.log('Listening'))
    }
    catch(e)
    {
        console.log(e)
    }
}

start(); 