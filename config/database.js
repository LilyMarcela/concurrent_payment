require("ts-node/register");
const { development, test, production } = require("./database.ts");

// Log the configurations to ensure they are being loaded
console.log({ development, test, production });

module.exports = { development, test, production };
