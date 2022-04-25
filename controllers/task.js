const {Tasks} = require('../util/database');


exports.createTask = (req,res,next)=>{
    const {taskName,boardId} = req.body;
    console.log(`++++++++++++++++++++++++++++++++++`);
    Tasks.create({
        name:taskName,
        status:'UnDone',
        boardId:boardId
    })
    .then(task=>{
        res.status(201).json(task.dataValues);
        console.log(task)
    })
    .catch((err)=>{
        res.status(209).json({message:'task not created'});
        console.log(err.message)
    })
}

exports.setNewTaskStatus = (req,res,next)=>{
    const{id,status} = req.body;
    console.log('api/task/status');
    console.log(`id=${id}`);
    console.log(`dtatus===${status}`);
    console.log(status);
    console.log(`${status[0]}==='U'`);

    Tasks.update(
        { status: status},
        { where: { id: id } }
      )
      .then(task=>{
          console.log('task');
          console.log(task);
          res.status(200).json({message:'Task update success'});
      })
      .catch(err=>{
        console.log('Update failed');
          res.json({message:'task not update'});
      })
}

exports.getTasksForBoard = (req,res,next)=>{
    const {boardId} = req.body;
    console.log(`boardId=${boardId}`);
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
          res.json({message:'task not faund'});
      })
}