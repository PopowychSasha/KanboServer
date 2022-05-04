const bcrypt = require("bcrypt");
const jsonWebToken = require("jsonwebtoken");
const { Users } = require("../util/database");

exports.signup = async (req, res, next) => {
  const { nickname, email, password, avatarPublicId } = req.body;
  const hashPassword = await bcrypt.hash(password, 12);

  const [user] = await Users.findAll({
    where: {
      nickname: nickname,
    },
  });

  if (user) {
    res.status(409).json({ message: "user already exists" });
    return;
  }
  Users.create({
    nickname,
    email,
    password: hashPassword,
    avatarPublicId,
  })
    .then(() => {
      const token = jsonWebToken.sign(
        { nickname, email},
        process.env.JWT_PRIVATE_KEY,
        { expiresIn: "24h" }
      );
      res.cookie("nickname%token", `${nickname}%${token}`);
      res
        .status(201)
        .json({ user: { nickname, email, avatarPublicId }, token });
    })
    .catch((err) => {
      console.log(err.message);
      res.status(422).json({ message: err.message });
    });
};

exports.signin = async (req, res, next) => {
  const { nickname, password } = req.body;
  const [user] = await Users.findAll({
    where: {
      nickname: nickname,
    },
  });

  if (!user) {
    res.status(403).json({ message: "Invalide nickname or password" });
    return;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    res.status(403).json({ message: "Invalide nickname or password" });
    return;
  } else {
    const token = jsonWebToken.sign(
      { nickname: user.nickname, email: user.email },
      process.env.JWT_PRIVATE_KEY,
      { expiresIn: "24h" }
    );
    
    res.cookie(
      "nickname%token",
      `${user.nickname}%${token}` /* ,{httpOnly:true} */
    );
    res.status(200).json(user);
  }
};

exports.getAccount = async (req, res, next) => {
  const nicknameFromCookie = req.get("Cookie").split("=")[1].split("%25")[0];

  const [user] = await Users.findAll({
    where: {
      nickname: nicknameFromCookie,
    },
  });
  
  res.json({
    id:user.id,
    nickname: user.nickname,
    email: user.email,
    avatarPublicId: user.avatarPublicId,
  });
};

exports.logout = async (req, res, next) => {
  res.clearCookie("nickname%token");
  res.status(200).json({ message: "Cookies are deleted" });
};

exports.changeAccountData = (req, res, next) => {
  const{id,nickname,email,avatarPublicId} = req.body;

  console.log(`${id} ${nickname} ${email} ${avatarPublicId}`);
  Users.update(
    { nickname: nickname},
    { where: { id: Number(id) } }
  )
  .then(()=>{
      res.status(200).json({message:'Task update success'});
  })
  .catch(err=>{
      console.log(err.message);
      res.status(500).json({message:err.message});
  })

  Users.update(
    { email:email},
    { where: { id: Number(id) } }
  )
  .then(()=>{
      res.status(200).json({message:'Task update success'});
  })
  .catch(err=>{
      console.log(err.message);
      res.status(500).json({message:err.message});
  })

  Users.update(
    { avatarPublicId:avatarPublicId},
    { where: { id: Number(id) } }
  )
  .then(()=>{
      res.status(200).json({message:'Task update success'});
  })
  .catch(err=>{
      console.log(err.message);
      res.status(500).json({message:err.message});
  })

  const token = jsonWebToken.sign(
    { nickname: user.nickname, email: user.email },
    process.env.JWT_PRIVATE_KEY,
    { expiresIn: "24h" }
  );
  
  res.cookie(
    "nickname%token",
    `${'nickname'}%${'token'}` /* ,{httpOnly:true} */
  );
  res.status(200).json({message:'Data is changed!!!'});
};

