const express = require('express');
const bodyParser = require('body-parser');

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

app.get('/games/:id', (req, res) => {
    const id = req.params.id;

    if(isNaN(id)){
        res
            .status(400)
            .json(
                {
                    status: 400,
                    message: "ID must have a numeric value"
                }
            );
        return;
    }

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
})

app.listen(8080, () => {
    console.log("API running on port 8080");
})