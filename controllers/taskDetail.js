const {TaskDetails} = require('../util/database');
exports.getTaskDetails = async (req,res,next)=>{
    const{taskId} = req.body;
    const [taskDetails] = await TaskDetails.findAll({
        where: {
          taskId: taskId,
        },
    });
    console.log('taskDetails');
    
    console.log(taskDetails);
    res.json({details:taskDetails.dataValues.details});
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
            console.log('Створено успішно');
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