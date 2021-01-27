var DataTypes = require("sequelize").DataTypes;
var _account = require("./account");

function initModels(sequelize) {
  var account = _account(sequelize, DataTypes);


  return {
    account,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
