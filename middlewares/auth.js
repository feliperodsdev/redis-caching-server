const jwt = require('jsonwebtoken')

const AuthMiddleware = (req, res, next) => 
{
    var authToken = req.headers.authorization
    if(!authToken || !authToken.startsWith('Bearer ')) throw new Error('Token wasnt send')
    else
    {
        try 
        {
            var token = authToken.split(' ')[1]
            const user = jwt.verify(token, process.env.SECRET_KEY)
            req.user = user
            next()
        }
        catch(e)
        {
            throw new Error('Token not valid')
        }
    }
}

module.exports = AuthMiddleware