const UserModel = require('../models/users');

const register = async (req, res, next) => {
    const {name, email, password} = req.body;
    try{
        const user = await UserModel.findOne({email}).exec();
        if(user !== null){
            return res.status(409).send({message: "User already registered"}); 
        }   await UserModel.create({name, email, password});
            res.status(201).send({message: "Registration successfull"}); 
    } catch(error){
        next(error);
    }
}

module.exports = register;