const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Vehicules } = require('../models/vehicules');
var { Depences } = require('../models/depences');


router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next();
});

// => localhost:3000/vehicules/
router.get('/', (req, res) => {
    Vehicules.find((err, docs) => {
        if (!err) { res.send(docs); } else {
            console.log('error in Retriving Vehicules: ' + JSON.stringify(err, undefined, 2));
        }
    });
});


router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id: ${req.params.id}');

    Depences.findById(req.params.id, (err, doc) => {
        if (!err) {
            Vehicules.findOne({ 'matriculation': doc.immat }, (err, doc) => {
                if (!err) {
                    res.send(doc);
                } else { console.log('Error in Retriving Vehicules:' + JSON.stringify(err, underfined, 2)); }
            });
        } else { console.log('Error in Retriving Vehicules:' + JSON.stringify(err, underfined, 2)); }
    });
    /*
        Vehicules.findById(req.params.id, (err, doc) => {
            if (!err) { 
                res.send(doc);
                console.log(doc);
             } else { console.log('Error in Retriving Vehicules:' + JSON.stringify(err, underfined, 2)); }
        });
    */
});

router.post('/', (req, res) => {
    var uti = new Vehicules({
        matriculation: req.body.matriculation,
        typee: req.body.typee,
        marquee: req.body.marquee,
        modelee: req.body.modelee,
        servicee: req.body.servicee,
        datacirculation: req.body.datacirculation
    });
    uti.save((err, doc) => {
        if (!err) { res.send(doc); } else {
            console.log('error in Vehicules save: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id: ${req.params.id}');
    var uti = {
        matriculation: req.body.matriculation,
        typee: req.body.typee,
        marquee: req.body.marquee,
        modelee: req.body.modelee,
        servicee: req.body.servicee,
        datacirculation: req.body.datacirculation
    };
    Vehicules.findByIdAndUpdate(req.params.id, { $set: uti }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); } else {
            console.log('error in Vehicules update: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id: ${req.params.id}');
    Vehicules.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); } else {
            console.log('error in Vehicules delete: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

module.exports = router;
