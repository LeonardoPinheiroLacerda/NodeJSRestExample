const jwt = require('jsonwebtoken');

const JWT_SECRET_KEY = "lkfhsdlkjhalsdjkfhalskdjhfnalksfhlkjashnfglakmsdgflkasd";

function authenticate(req, res, next){
    const authToken = req.headers['authorization'];

    if(authToken == undefined){
        res.status(401).json({status:400, message:"Token não informado."});
        return;
    }

    if(!authToken.startsWith("Bearer ")){
        res.status(401).json({status:400, message:"Token inválido, todo token deve ter o prefixo 'Bearer '"});
        return;
    }

    const token = authToken.split(' ')[1];
    
    jwt.verify(token, JWT_SECRET_KEY, (err, data) => {
        if(err){
            res.status(401).json({status:400, message:"o token não é confiável!"});
            return;
        }

        req.token = token;
        req.loggedUser = {id: data.id, email: data.subjet};

        next();
    });

    
}

module.exports = {
    authenticate,
    JWT_SECRET_KEY
};