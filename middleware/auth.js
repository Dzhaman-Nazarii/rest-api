const jwt = require('jsonwebtoken');
const UserModel = require('../models/users')

const auth = async (req, res, next) => {
    const authHeader = req.headers.authorization || '';
    const [bearer, token] = authHeader.split(" ", 2);
    if(bearer !== "Bearer") {
        return res.status(401).send({message: "No token provided"})
    }
    jwt.verify(token, process.env.JWT_SECRET, async (error, decode) => {
        if(error){
            if(error.name === "TokenExpiredError") {
                return res.status(401).send({message: "Token is expired"})
            }
            return next(error)
        }   
        try{
            const user = await UserModel.findById(decode.id).exec();
            if(user.token !== token) {
                return res.status(401).send({message: "You are not authorized"})
            }
            req.user = {id: decode.id};
            next();
        } catch(error){
            next(error);
        }
    })
}

module.exports = auth;