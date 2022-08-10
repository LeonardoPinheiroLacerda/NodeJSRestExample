const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const GameController = require("./controllers/GameController");
const UserController = require("./controllers/UserController");

const Game = require("./database/models/Game");
const User = require("./database/models/User");

const app = express();

const {JWT_SECRET_KEY} = require("./middlewares/authenticate")

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/games', GameController);
app.use('/users',UserController);

app.post("/auth", async (req, res) => {
    
    const {email, password} = req.body;

    if(email == undefined || password == undefined){
        res.status(400).json({
            status: 400,
            message: "E-mail e senha são campos obrigatórios para a autenticação do usuário"
        });
        return;
    }

    const user = await User.findOne({where : {email : email}});

    if(!user || !bcrypt.compareSync(password, user.password)){
        res.status(403).json({
            status: 403,
            message: "E-mail ou senha estão incorretos"
        });
        return;
    }   

    jwt.sign({id: user.id, subjet: email}, JWT_SECRET_KEY, {expiresIn: "48h"}, (err, token) => {
        if(err){
            res.status(500).json({status: 500, message: err});
            return;
        }
        
        res.json({
            token: "Bearer " + token
        });
    });

});

app.listen(8080, () => {
    console.log("API running on port 8080");
});