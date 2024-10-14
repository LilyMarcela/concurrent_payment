const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const { sequelize } = require("../config/database"); // Import your Sequelize instance
const basename = path.basename(__filename);
const db = {};

// Read and load all the TypeScript models from the src/models folder
fs.readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".ts"
  )
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

// Set up any model associations if they exist
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
