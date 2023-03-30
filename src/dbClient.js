var redis = require("redis");
const { REDIS_PORT, REDIS_HOST } = require("./env");

var db = redis.createClient({
  host: REDIS_HOST,
  port: REDIS_PORT,
  retry_strategy: () => {
    return new Error("Retry time exhausted")
  }
});

db.connect();

process.on('SIGINT', function() {
  db.quit();
});

module.exports = db
