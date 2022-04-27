const Sequelize = require("sequelize");
const createUsersModel = require('../models/user');
const createBoardsModel  = require('../models/board');
const createTasksModel  = require('../models/task');
const createTaskDetailsModel = require('../models/taskDetail');

const sequelize = new Sequelize("kanbo", "root", "mainAdmin1", {
  dialect: "mysql",
  host: "localhost",
});

const checkConnect = async ()=>{
  try{
    /* sequelize.sync({ force: true }).then(() => {
        console.log('Drop and re-sync db.');
    }); */

    await sequelize.authenticate();

    console.log('---------------------------------------');
    console.log('Connected successfully');
    console.log('---------------------------------------');

  }catch(err){
    console.log('---------------------------------------');
    console.error('Connected to batabase failed(((');
    console.log('---------------------------------------');
  }
}

const Users = createUsersModel(sequelize);
const Boards = createBoardsModel(sequelize);
const Tasks = createTasksModel(sequelize);
const TaskDetails = createTaskDetailsModel(sequelize);
/* Boards.hasOne(Users,{onDelete:'cascade'});
Users.belongsTo(Boards); */

Users.hasMany(Boards,{onDelete:'cascade'});
Boards.belongsTo(Users);

Boards.hasMany(Tasks,{onDelete:'cascade'});
Tasks.belongsTo(Boards);

Tasks.hasOne(TaskDetails,{onDelete:'cascade'});
TaskDetails.belongsTo(Tasks);

module.exports = {
  checkConnect,
  Users,
  Boards,
  Tasks,
  TaskDetails
};
