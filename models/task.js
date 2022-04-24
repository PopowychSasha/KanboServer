const {DataTypes} = require("sequelize");

const createTasksModel = orm =>{
  const Tasks = orm.define("tasks", {
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
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    }
  });
  return Tasks;
}


module.exports = createTasksModel;