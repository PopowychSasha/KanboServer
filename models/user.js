const {DataTypes} = require("sequelize");

const createUsersModel = orm =>{
  const Users = orm.define("users", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatarPublicId: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
  return Users;
}


module.exports = createUsersModel;
