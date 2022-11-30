const Month = require("../models/month.model")

module.exports.get_all = (req, res) => {
    Month.find().sort({numero: 1})
        .then(months => res.json(months))
        .catch( err =>{
            console.log(err);
            res.status(400).json(err);
        });
}

module.exports.create_month = (req, res) => {
    Month.create(req.body)
        .then(month => res.json(month))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
}

module.exports.get_month = (req, res) => {
    Month.findOne({_id: req.params.id})
        .then(month => res.json(month))
        .catch(err => res.status(400).json(err));
}

module.exports.update_month = (req, res) => {
    //new:true nos regresa el documento ya modificado
    //runValidators: true nos revisa una vez más las validaciones del modelo
    Month.findByIdAndUpdate({_id: req.params.id}, req.body, {new:true, runValidators:true})
        .then(month => res.json(month))
        .catch(err => res.status(400).json(err));
}

module.exports.delete_month = (req, res) => {
    Month.deleteOne({_id: req.params.id})
        .then(result => res.json(result))
        .catch(err => res.status(400).json(err));
}