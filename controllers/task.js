const {Tasks} = require('../util/database');

exports.createTask = (req,res,next)=>{
    const {taskName,boardId} = req.body;
    Tasks.create({
        name:taskName,
        status:'Todo',
        boardId:boardId
    })
    .then(task=>{
        res.status(201).json(task.dataValues);
    })
    .catch((err)=>{
        console.log(err.message);
        res.status(500).json({message:err.message});
    })
}

exports.setNewTaskStatus = (req,res,next)=>{
    const{id,status} = req.body;
    
    Tasks.update(
        { status: status},
        { where: { id: id } }
      )
      .then(()=>{
          res.status(200).json({message:'Task update success'});
      })
      .catch(err=>{
          console.log(err.message);
          res.status(500).json({message:err.message});
      })
}

exports.getTasksForBoard = (req,res,next)=>{
    const boardId = req.params.id;

    Tasks.findAll({
        where:{
            boardId:boardId
        }
    })
      .then(tasks=>{
          res.status(200).json(tasks);
      })
      .catch(err=>{
          console.log(err.message);
          res.json({message:err.message});
      })
}

exports.editTask = (req,res,next)=>{
    const {taskId,editTask} = req.body;
    
    Tasks.update(
        { name: editTask},
        { where: { id: taskId } }
      )
      .then(()=>{
          res.status(200).json({editTask:editTask});
      })
      .catch(err=>{
          console.log(err.message);
          res.status(500).json({message:err.message});
      })
}