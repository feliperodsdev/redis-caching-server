const UserModel = require('../models/User')
const jwt = require('jsonwebtoken')

class UserControler 
{
    async login(req, res)
    {
        var {username, password} = req.body
        var user = await UserModel.findOne(username)

        if(!user) res.status(400).send('User not found')
        else
        {
            if(!(await UserModel.compareHash(password))) res.status(400).send('Password dont match')
            else 
            {
                var token = jwt.sign({_id:user._id}, process.env.SECRET_KEY, {expiresIn: '10h'})
                res.status(200).json({msg:'success', token})
            }
        }
    }

    async createUser(req, res)
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
}