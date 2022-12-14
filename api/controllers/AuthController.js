const express = require('express');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {JWT_SECRET_KEY} = require("./../middlewares/authenticate");

const User = require('../database/models/User');

const router = express.Router();

router.post("/", async (req, res) => {
    
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

    jwt.sign({id: user.id, subjet: email}, JWT_SECRET_KEY, {expiresIn: "30m"}, (err, token) => {
        if(err){
            res.status(500).json({status: 500, message: err});
            return;
        }
        
        res.json({
            token: "Bearer " + token
        });
    });

});

module.exports = router;