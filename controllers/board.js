const { Users } = require("../util/database");
const { Boards } = require("../util/database");

exports.createBoard = async (req, res, next) => {
  const nicknameFromCookie = req.get("Cookie").split("=")[1].split("%25")[0];
  const { name, type } = req.body;

  const [user] = await Users.findAll({
    where: {
      nickname: nicknameFromCookie,
    },
  });

  Boards.create({
    name: name,
    type: type,
    userId: user.id,
  })
    .then((board) => {
      res.status(200).json(board);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({ message: err.message });
    });
};

exports.getBoards = async (req, res, next) => {
  const nicknameFromCookie = req.get("Cookie").split("=")[1].split("%")[0];
  
  const [user] = await Users.findAll({
    where: {
      nickname: nicknameFromCookie,
    },
  });

  const boards = await Boards.findAll({
    where: {
      userId: user.id,
    },
  });

  const boardsResponce = boards.map((item) => {
    return {
      id: item.dataValues.id,
      name: item.dataValues.name,
      type: item.dataValues.type,
      createdAt: item.dataValues.createdAt,
    };
  });

  res.status(200).json(boardsResponce);
};

exports.deleteBoard = (req, res, next) => {
  const boardId  = req.params.id;
  
  try{
      Boards.destroy({
        where: {
          id: boardId,
        },
      });
      res.status(200).json({ message: "Board delete successful" });
  }
  catch(err){
      res.status(500).json({ message: err.message });
  }
};

exports.getBoardName =async (req, res, next) => {
  const boardId  = req.params.id;
  const nicknameFromCookie = req.get("Cookie").split("=")[1].split("%")[0];

  const [board] = await Boards.findAll({
      where: {
        id: boardId,
      },
  });

  const [user] = await Users.findAll({
    where: {
      nickname: nicknameFromCookie,
    },
  });

  if(board===undefined){
    res.status(403).json({message:'Access deny'});
    return;
  }
  else if(user.id!==board.userId){
    res.status(403).json({message:'Access deny'});
    return;
  }
  else if(user.id===board.userId){
    res.status(200).json({name:board.dataValues.name});
    return;
  }
};