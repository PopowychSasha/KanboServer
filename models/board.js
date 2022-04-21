const {DataTypes} = require("sequelize");

const createBoardsModel = orm =>{
  const Boards = orm.define("boards", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    }
  });
  return Boards;
}


module.exports = createBoardsModel;