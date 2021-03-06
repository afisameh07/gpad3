const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Modeles } = require('../models/modelesvehicules');


router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next();
});
router.get('/', (req, res) => {
        Modeles.find({}, (err, docs) => {
            if (!err) { res.send(docs); } else {
                console.log('erreur get data: ' + JSON.stringify(err, undefined, 2));
            }
        });
});

router.post('/', (req, res) => {
    var att = new Modeles({
        nom: req.body.nom,
    });
    if(att.nom != ""){
        att.save((err, doc) => {
            if (!err) { res.send(doc); } else {
                console.log('erreur: ' + JSON.stringify(err, undefined, 2));
            }
        });
    }else{
        console.log("erreuur !");
    }
   
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id: ${req.params.id}');
        Modeles.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); } else {
            console.log('error in Modeles delete: ' + JSON.stringify(err, undefined, 2));
        }
    });
});
module.exports = router;
