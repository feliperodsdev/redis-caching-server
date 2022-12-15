const Redis = require('ioredis');
const {promisify} = require('util')

const redisClient = new Redis();

function getRedis(value) {
  const syncRedisGet = promisify(redisClient.get).bind(redisClient);
  return syncRedisGet(value);
}

function setRedis(key, value) {
  const syncRedisSet = promisify(redisClient.set).bind(redisClient);
  return syncRedisSet(key, value);
}

module.export = { redisClient, getRedis, setRedis };
