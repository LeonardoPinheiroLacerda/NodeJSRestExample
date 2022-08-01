const express = require('express');
const bodyParser = require('body-parser');

const checkIdType = require("./middlewares/checkIdType");

const Game = require('./database/models/Game');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.get('/games', async (req, res) => {
    
    const games =  await Game.findAll();
    res
        .status(200)
        .json(games);

});

app.get('/games/:id', checkIdType, async (req, res) => {
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

app.post('/games', async (req, res) => {

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

    await Game.create(game);

    res
        .status(201)
        .send();
    
});

app.delete("/games/:id", checkIdType, async (req, res) => {

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

app.put("/games/:id", checkIdType, async (req, res) => {

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

    await Game.update(game, 
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

app.listen(8080, () => {
    console.log("API running on port 8080");
})