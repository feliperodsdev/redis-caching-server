const PostModel = require('../models/Post')
const UserModel = require('../models/User')
const {getRedis, setRedis, deleteRedis} = require('../redisConfig')

const createPost = async (req, res) => 
{
    var owner_user_id = req.user 
    var postToBeCreated = req.body
    try 
    {
        var authorRedis = await getRedis(`user-${owner_user_id}`)
        var author; 
        if(!authorRedis)
        {
            var authorDb = await UserModel.findOne({_id:owner_user_id})
            if(!authorDb) throw new Error('User doesnt exist')
            setRedis(`user-${owner_user_id}`, {username: authorDb.username, name: authorDb.name})
            author = authorDb.username
        }
        else 
        {
            author = authorRedis.username
        }
        var post = await PostModel.create({title: postToBeCreated.title, content:postToBeCreated.content, author:author, author_id:owner_user_id})
        setRedis(`post-${owner_user_id}-${post._id}`, post)
        res.status(200).send(post)
    }
    catch(e)
    {
        console.log(e)
    }
}

const deletePost = async (req, res) =>
{
    var post_id = req.body 
    var owner_user_id = req.user
    try 
    {
        var postToBeDeleted = await PostModel.findOne({_id:post_id})
        if(!postToBeDeleted) throw new Error('post doesnt exist')
        else 
        {
            await deleteRedis(`post-${owner_user_id}-${post_id}`)
            await PostModel.deleteOne({_id:post_id})
            res.status(200).send('post deleted')
        }
    }
    catch(e)
    {
        console.log(e)
    }
}

module.exports = {
    createPost, 
    deletePost
}