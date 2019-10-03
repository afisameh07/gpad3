const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Depences } = require('../models/depences');


router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next();
});
router.get('/', (req, res) => {
    Depences.find({}, (err, docs) => {
        if (!err) { res.send(docs); } else {
            console.log('erreur get data: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

router.post('/', (req, res) => {

    console.log(req.body);

    var att = new Depences({

        dad: req.body.dad,
        dad_date: req.body.dad_date,
        bc: req.body.bc,
        bc_date: req.body.bc_date,
        immat: req.body.immat,
        libelle: req.body.libelle,
        description: req.body.description,
        montant: req.body.montant,
        facture: req.body.facture,
        fournisseur: req.body.fournisseur,
        intervention_date: req.body.intervention_date,


    });
    if (att.d_date != "") {
        att.save((err, doc) => {
            if (!err) { res.send(doc); } else {
                console.log('erreur: ' + JSON.stringify(err, undefined, 2));
            }
        });
    } else {
        console.log("erreuur !");
    }

});
router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id: ${req.params.id}');
    var uti = {
        dad: req.body.dad,
        dad_date: req.body.dad_date,
        bc: req.body.bc,
        bc_date: req.body.bc_date,
        immat: req.body.immat,
        libelle: req.body.libelle,
        description: req.body.description,
        montant: req.body.montant,
        facture: req.body.facture,
        fournisseur: req.body.fournisseur,
        intervention_date: req.body.intervention_date,

    };
    Depences.findByIdAndUpdate(req.params.id, { $set: uti }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); } else {
            console.log('error in Vehicules update: ' + JSON.stringify(err, undefined, 2));
        }
    });
});
router.delete('/:id', (req, res) => {

    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id: ${req.params.id}');
    Depences.deleteOne({ _id: req.params.id }, function (err, doc) {
        if (err) return handleError(err);
        // deleted at most one tank document
        res.send(doc);
    });
});
module.exports = router;
