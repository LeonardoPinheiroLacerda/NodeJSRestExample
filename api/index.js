const express = require('express');

const bodyParser = require('body-parser');
const cors = require('cors');

const GameController = require("./controllers/GameController");
const UserController = require("./controllers/UserController");
const AuthController = require("./controllers/AuthController");

const Game = require("./database/models/Game");
const User = require("./database/models/User");

const SwaggerDocs = require("./docs/Swagger");

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/games', GameController);
app.use('/users',UserController);
app.use('/auth', AuthController);

const swaggerObj = new SwaggerDocs(app);
swaggerObj.createDocs();

app.listen(8080, () => {
    console.log("API running on port 8080");
});