const {TaskDetails,Tasks,Boards,Users} = require('../util/database');
exports.getTaskDetails = async (req,res,next)=>{
    const taskId  = req.params.id;

    const [taskDetails] = await TaskDetails.findAll({
        where: {
          taskId: taskId,
        },
    });

    const nicknameFromCookie = req.get("Cookie").split("=")[1].split("%")[0];

    const [task] = await Tasks.findAll({
        where: {
          id: taskId,
        },
      });

      if(!task){
        res.status(403).json({message:'TaskDetailsDeny'})
      }


      const [board] = await Boards.findAll({
        where: {
          id: task.dataValues.boardId,
        },
    });

    const [user] = await Users.findAll({
        where: {
          nickname: nicknameFromCookie,
        },
      });
    
    if(board===undefined){
        console.log(111);
        res.status(403).json({message:'Access deny'});
        return;
      }
      else if(user.id!==board.userId){
        console.log(222);
        res.status(403).json({message:'Access deny'});
        return;
      }
      else if(user.id===board.userId){
        console.log(333);
        res.json({details:taskDetails.dataValues.details});
        return;
      } 

    
}
exports.createTaskDetails =async (req,res,next)=>{
    const {taskId,details} = req.body;

    const [isDetailsForTask] = await TaskDetails.findAll({
        where: {
          taskId: taskId,
        },
    });

    if(!isDetailsForTask){
        TaskDetails.create({
            details:details,
            taskId:taskId
        })
        .then(details=>{
            res.status(201).json(details.dataValues);
        })
        .catch(err=>res.json({message:err.message}))
    }
    else{
        TaskDetails.update(
            { details: details},
            { where: { taskId: taskId } }
          )
          .then(()=>{
              res.status(200).json({message:'Task update success'});
          })
          .catch(err=>{
              console.log(err.message);
              res.status(500).json({message:err.message});
          })
    }
}