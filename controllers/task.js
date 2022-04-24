const {Tasks} = require('../util/database');


exports.createTask = (req,res,next)=>{
    const {taskName,boardId} = req.body;
    console.log(`++++++++++++++++++++++++++++++++++`);
    Tasks.create({
        name:taskName,
        status:'UnDone',
        boardId:boardId
    });
    res.status('200').json({message:'Task is created!'});
}