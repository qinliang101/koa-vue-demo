var DataTypes = require("sequelize").DataTypes;
var _token = require("./token");
var _user = require("./user");

function initModels(sequelize) {
  var token = _token(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);


  return {
    token,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
