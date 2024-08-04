require("ts-node/register")
const dotenv = require("dotenv");

dotenv.config({ path: ".env" });

module.exports = require("./src/knex").configKnex;

export {};
