const express = require('express');
const bodyParser = require('body-parser');

const checkIdType = require("./middlewares/checkIdType");

const Game = require('./database/models/Game')

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const DB = {
    games: [
        {
            id: 23,
            title: 'Call of duty MW',
            year: 2019,
            price: 60
        },
        {
            id: 65,
            title: 'Sea of thieves',
            year: 2018,
            price: 40
        },
        {
            id: 2,
            title: 'Minecraft',
            year: 2012,
            price: 20
        },
    ]
};

app.get('/games', (req, res) => {
    
    res
        .status(200)
        .json(DB.games);
});

app.get('/games/:id', checkIdType, (req, res) => {
    const id = req.params.id;

    const game = DB.games.find(game => game.id === parseInt(id));

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

app.post('/games', (req, res) => {

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
        id: 2323,
        title, 
        price, 
        year        
    };

    DB.games.push(game);

    res
        .status(201)
        .send();
    
});

app.delete("/games/:id", checkIdType, (req, res) => {

    const id = req.params.id;

    const gameIndex = DB.games.findIndex(game => game.id === parseInt(id));

    if(gameIndex === -1){
        res
            .status(404)
            .send();
        return;
    }

    DB.games.splice(gameIndex, 1);

    res
        .status(200)
        .send();

});

app.put("/games/:id", checkIdType, (req, res) => {

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

    const game = DB.games.find(game => game.id === parseInt(id));

    if(title) game.title = title;
    if(price) game.price = price;
    if(year)  game.year = year;

    res
        .status(200)
        .send();

});

app.listen(8080, () => {
    console.log("API running on port 8080");
})