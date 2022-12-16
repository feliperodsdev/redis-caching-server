const Redis = require('ioredis');
const {promisify} = require('util')

const redisClient = new Redis({
  host: 'localhost',
  port: 6379,
});

async function getRedis(value)  {
  const data = await redisClient.get(value)
  return data ? JSON.parse(data) : null; 
}

async function setRedis(key, value) {
  const data = JSON.stringify(value)
  return await redisClient.set(key, data)
}

module.exports = {redisClient, getRedis, setRedis}
