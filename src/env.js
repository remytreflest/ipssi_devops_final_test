/**
 * Define the application environment
 * Here some constants used by Redis database
 */

const dotenv = require("dotenv");

dotenv.config();

const REDIS_PORT = process.env.REDIS_PORT ?? "6379";
const REDIS_HOST = process.env.REDIS_HOST ?? "localhost";

module.exports = {
    REDIS_PORT,
    REDIS_HOST
};