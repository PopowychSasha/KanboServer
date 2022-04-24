const {Users} = require('../util/database');
const {Boards} = require('../util/database');

exports.createBoard = async (req,res,next)=>{
    const nicknameFromCookie = req.get('Cookie').split('=')[1].split('%')[0];
    const {name,type} = req.body;

    const [user] = await Users.findAll({
        where:{
            nickname:nicknameFromCookie
        }
    })

    Boards.create({
        name:name,
        type:type,
        userId:user.id
    })
    .then((board)=>{
        console.log('Board create success');
        res.json(board);
    })
    .catch((err)=>console.log(err.message))
}

exports.getBoards = async (req,res,next)=>{
    const nicknameFromCookie = req.get('Cookie').split('=')[1].split('%')[0];

    const [user] = await Users.findAll({
        where:{
            nickname:nicknameFromCookie
        }
    })

    const boards = await Boards.findAll({
        where:{
            userId:user.id
        }
    });
    const boardsResponce = boards.map(item=>{
        return {
            id:item.dataValues.id,
            name:item.dataValues.name,
            type:item.dataValues.type,
            createdAt:item.dataValues.createdAt,
        }
    })

    res.json(boardsResponce);
}