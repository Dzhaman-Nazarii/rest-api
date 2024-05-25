const contactModel = require('../models/contacts.js');

const getAll = async (req, res, next) => {
    try {
        const docs = await contactModel.find().exec();
        res.send(docs);
    } catch(error){
        next(error)
    }
}

const getById = async (req, res,next) => {
    const {id} = req.params;
    try{
        const doc = await contactModel.findById(id).exec();
        if(doc === null) {
            res.status(404).send({message: "Not found"})
        }
        res.send(doc);
    } catch(error){
        next(error);
    }
};

const remove = async (req, res, next) => {
    const {id} = req.params;
    try{
        const doc = await contactModel.findOneAndDelete(id).exec();
        res.status(204).end();
    } catch(error){
        next(error)
    }
};

const create = async(req, res, next) => {
    const {name, email, phone, favorite} = req.body;
    const contact = {
        name,
        email,
        phone,
        favorite
    }
    try{
        const doc = await contactModel.create(contact);
        res.status(201).send(doc);
    } catch(error){
        next(error)
    }
};

const update = async (req, res, next) => {
    const {name, email, phone, favorite} = req.body;
    const {id} = req.params;

    const contact = {
        name,
        email,
        phone,
        favorite
    }

    try{
        const doc = await contactModel.findByIdAndUpdate(id, contact, {new: true}).exec();
        if(!doc){
            res.send({message: "missing fields"})
        }
        else if(doc === null) {
            res.status(404).send({message: "Not found"})
        }
        res.send(doc);
    } catch(error) {
        next(error)
    }
};

const updateStatusContact = async (req,res,next) =>  {
    const id = req.params.id;
    const favorite = req.body.favorite;
    try{
        const doc = await contactModel.findOneAndUpdate(
            { _id: id },
            { favorite },
            { new: true }
        );
        if (!doc) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.send(doc);
    } catch(error){
        next(error)
    }
}

module.exports = {
    getAll,
    getById,
    remove,
    create,
    update,
    updateStatusContact
}