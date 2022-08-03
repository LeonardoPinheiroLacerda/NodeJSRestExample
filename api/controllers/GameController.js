const express = require('express');
const Game = require('../database/models/Game');
const checkIdType = require("../middlewares/checkIdType");

const router = express.Router();

router.get('/games', async (req, res) => {
    
    const games =  await Game.findAll(
        {
            order:[
                ["id", "ASC"]
            ]
        }
    );
    res
        .status(200)
        .json(games);

});

router.get('/games/:id', checkIdType, async (req, res) => {
    const id = req.params.id;

    const game = await Game.findOne(
        {
            where: {
                id: id
            },
            raw: true
        }
    );

    // const game = await Game.findByPk(id);

    if(game){
        res 
            .status(200)
            .json(game);
    }else{
        res
            .status(404)
            .send();
    }
});

router.post('/games', async (req, res) => {

    const {title, price, year} = req.body;

    if(!title || !price || !year){
        res
            .status(400)
            .json(
                {
                    status: 400,
                    message: "The request body MUST contain title, price and year as required fields"
                }
            );
        return;
    }

    if(isNaN(price) || isNaN(year)){
        res
            .status(400)
            .json(
                {
                    status: 400,
                    message: "Year and price MUST be a numeric value"
                }
            );
        return;
    }

    const game = {
        title, 
        price, 
        year        
    };

    try{
        await Game.create(game);
    }catch(err){
        res.status(400).json(err.errors);
        return;
    }
   
    res
        .status(201)
        .send();
    
});

router.delete("/games/:id", checkIdType, async (req, res) => {

    const id = req.params.id;

    const game = await Game.findOne(
        {
            where: {
                id: id
            },
            raw: true
        }
    );

    if(!game){
        res
            .status(404)
            .send();
        return;
    }

    await Game.destroy(
        {
            where: {
                id: id
            }
        }
    );

    res
        .status(200)
        .send();

});

router.put("/games/:id", checkIdType, async (req, res) => {

    const id = req.params.id;

    const {title, price, year} = req.body;

    if(price && isNaN(price) || year && isNaN(year)){
        res
            .status(400)
            .json(
                {
                    status: 400,
                    message: "Year and price MUST be a numeric value"
                }
            );
        return;
    }

    const game = await Game.findOne(
        {
            where: {
                id: id
            },
            raw: true
        }
    );

    if(!game){
        res
            .status(404)
            .send();
        return;
    }

    if(title) game.title = title;
    if(price) game.price = price;
    if(year)  game.year = year;


    try{
        await Game.update(game, 
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

    res
        .status(200)
        .send();

});

module.exports = router;