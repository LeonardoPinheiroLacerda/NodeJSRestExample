const swaggerUi = require('swagger-ui-express');

const jsyaml = require('js-yaml');
const fs = require('fs');

class Swagger {

    constructor(app){
        this.app = app;
    }
    
    createDocs(){        
        fs.readFile('./docs/swagger.yml', {encoding: 'utf-8'} ,(err, data) => {
            const obj = jsyaml.load(data);

            this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(obj));
        });        
    }    

}

module.exports = Swagger;