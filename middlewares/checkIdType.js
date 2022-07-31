function checkIdType(req, res, next){
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
    next();
}

module.exports = checkIdType;