const {DataTypes} = require("sequelize");

const createTaskDetailsModel = orm =>{
  const TaskDetails = orm.define("taskDetails", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    details: {
      type: DataTypes.TEXT
    },
  });
  return TaskDetails;
}

module.exports = createTaskDetailsModel;