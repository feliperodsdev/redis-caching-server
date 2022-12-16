const UserModel = require('../models/User')
const jwt = require('jsonwebtoken')
const {getRedis, setRedis} = require('../redisConfig')

const login = async (req, res) =>
{
    var {username, password} = req.body
    var user = await UserModel.findOne({username})

    if(!user) res.status(400).send('User not found')
    else
    {
        if(!(await user.compareHash(password))) res.status(400).send('Password dont match')
        else 
        {
            var token = jwt.sign({_id:user._id}, process.env.SECRET_KEY, {expiresIn: '10h'})
            res.status(200).json({msg:'success', token})
        }
    }
}

const createUser = async (req, res) => 
{
    var {username, password, name} = req.body
    var userQuery = await UserModel.findOne({username})
    if(!userQuery)
    {
        var user = await UserModel.create({username, password, name})
        
        res.status(200).send(user)
    }
    else
    {
        res.status(400).send('User already exists')
    }
}

const getUserById = async (req, res) => 
{
    var userId = req.user
    try 
    {
        var user = await UserModel.findOne({userId})
        if(!user) res.status(404).send('User doesnt exists')
        else 
        {
            var userRedis = await getRedis(`user-${userId}`)
            if(!userRedis)
            {
                setRedis(`user-${userId}`, {username: user.username, name: user.name})
                res.status(200).send(user)
            }
            else 
            {
                res.status(200).send(userRedis)
            }
        }
    
    }
    catch(e)
    {
        console.log(e)
    }
}

module.exports = 
{
    login, 
    createUser, 
    getUserById
}