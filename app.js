const express = require('express');
const connectDb = require('./db/connect');
const userRouter = require('./routes/User');

const app = express(); 

app.use(express.json())
app.use('/user',userRouter)

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