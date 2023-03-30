let redis = require("redis");
const { REDIS_PORT, REDIS_HOST } = require("./env");

/**
 * Client used to communicate with the Redis database
 * @type {RedisClientType<RedisDefaultModules & RedisModules, RedisFunctions, RedisScripts>}
 */
let db = redis.createClient({
  host: REDIS_HOST,
  port: REDIS_PORT,
  retry_strategy: () => {
    return new Error("Retry time exhausted")
  }
});

// Connect to the database
db.connect().then(r => console.log("Connected to REDIS database"));

// When an administrator exit the terminal, disconnect from db
process.on('SIGINT', function() {
  db.quit();
});

module.exports = db
