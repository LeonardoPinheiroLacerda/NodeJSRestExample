const User = require("./../database/models/User");

const jwt = require('jsonwebtoken');

const JWT_SECRET_KEY = "lkfhsdlkjhalsdjkfhalskdjhfnalksfhlkjashnfglakmsdgflkasd";

function authenticate(req, res, next){
    const authToken = req.headers['authorization'];

    if(authToken == undefined){
        res.status(401).json({status:401, message:"Token não informado."});
        return;
    }

    if(!authToken.startsWith("Bearer ")){
        res.status(401).json({status:401, message:"Token inválido, todo token deve ter o prefixo 'Bearer '"});
        return;
    }

    const token = authToken.split(' ')[1];
    
    jwt.verify(token, JWT_SECRET_KEY, (err, data) => {
        if(err){
            res.status(401).json({status:401, message:"o token não é confiável!: " + err});
            return;
        }

        User.findOne({where:{email: data.subjet}, raw: true}).then(user => {
            if(!user){
                res.status(401).json({status:401, message:"o token não é confiável!: " + err});
                return;
            }

            req.token = token;
            req.loggedUser = {id: data.id, email: data.subjet};

            next();
        });

    });

    
}

module.exports = {
    authenticate,
    JWT_SECRET_KEY
};