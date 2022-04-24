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