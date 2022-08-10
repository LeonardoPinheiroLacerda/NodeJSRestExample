const express = require('express');
const User = require('./../database/models/User');
const bcrypt = require("bcryptjs");

const {authenticate} = require("../middlewares/authenticate");
const checkIdType = require("../middlewares/checkIdType");

const router = express.Router();

router.get("/users", authenticate, async (req, res) => {
    const users = await User.findAll();

    const dto = users.map(user => {
        return {id: user.id, name: user.name, email: user.email};
    });

    res.json(dto);
});

router.get("/users/:id", authenticate, checkIdType, async (req, res) => {

    const id = req.params.id;

    const user = await User.findByPk(id);

    if(!user){
        res
            .status(404)
            .send();
        return;
    }

    const {name, email} = user;
    const dto = {id, name, email};

    res.json(dto);
});

router.post("/users", async (req, res) => {

    const {name, email, password} = req.body;

    const salt = bcrypt.genSaltSync(5);
    const hash = bcrypt.hashSync(password, salt);

    const user = {name, email, password: hash};

    try{
        await User.create(user);
    }catch(err){
        res.status(400).json(err.errors);
    }

    res
        .status(201)
        .send();
});

router.put("/users/:id", authenticate, checkIdType, async (req, res) => {
    const id = req.params.id;

    const {name, email, password} = req.body;

    const user = await User.findByPk(id, {raw:true});

    if(!user){
        res
            .status(404)
            .send();
        return;
    }

    if(name) user.name = name;
    if(email) user.email = email;
    if(password) {
        const salt = bcrypt.genSaltSync(5);
        const hash = bcrypt.hashSync(password, salt);

        user.password = hash;
    }

    try{
        await User.update(user, 
            {
                where: {
                    id: id
                }
            }
        );
    }catch(err){
        res.status(400).json(err.errors);
        return;
    }

    res.status(200).send();
});

router.delete("/users/:id", authenticate, checkIdType, async (req, res) => {

    const id = req.params.id;

    const user = await User.findByPk(id);

    if(!user){
        res
            .status(404)
            .send();
        return;
    }

    await User.destroy(
        {
            where: {
                id: id
            }
        }
    );

    res.status(200).send();

});


module.exports = router;