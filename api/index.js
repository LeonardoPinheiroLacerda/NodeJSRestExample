const express = require('express');
const bodyParser = require('body-parser');

const GameController = require("./controllers/gameController");

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(GameController);

app.listen(8080, () => {
    console.log("API running on port 8080");
})