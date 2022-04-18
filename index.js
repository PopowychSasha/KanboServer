const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.js');

require('dotenv').config();

const sequelize = require('./util/database.js');
const User = require('./models/user.js');

const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

app.use(userRoutes);

sequelize.sync()
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is started on port ${PORT}`);
    });
})
.catch((err)=>console.log(err.message))

