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

app.get('/', (req, res) => {

});

app.listen(8080, () => {
    console.log("API running on port 8080");
})