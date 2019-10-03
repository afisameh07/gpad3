const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Utilisateurs } = require('../models/utilisateurs');


router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    next();
});

// => localhost:3000/utilisateurs/
router.get('/', (req, res) => {
    Utilisateurs.find((err, docs) => {
        if (!err) { res.send(docs); } else {
            console.log('error in Retriving Utilisateurs: ' + JSON.stringify(err, undefined, 2));
        }
    });
});


router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id: ${req.params.id}');

        Utilisateurs.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in Retriving Utilisateurs:' + JSON.stringify(err, underfined, 2)); }
    });
});

router.post('/', (req, res) => {
    var uti = new Utilisateurs({
        name: req.body.name,
        email: req.body.email,
        adresse: req.body.adresse,
        tel: req.body.tel,
        cin: req.body.cin,
        pwd: req.body.pwd,
        grade: req.body.grade
    });
    uti.save((err, doc) => {
        if (!err) { res.send(doc); } else {
            console.log('error in Utilisateurs save: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id: ${req.params.id}');
    var uti = {
        name: req.body.name,
        email: req.body.email,
        adresse: req.body.adresse,
        tel: req.body.tel,
        cin: req.body.cin,
        pwd: req.body.pwd,
        grade: req.body.grade
    };
    Utilisateurs.findByIdAndUpdate(req.params.id, { $set: uti }, {new: true }, (err, doc) => {
        if (!err) { res.send(doc); } else {
            console.log('error in Utilisateurs update: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id: ${req.params.id}');
        Utilisateurs.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); } else {
            console.log('error in Utilisateurs delete: ' + JSON.stringify(err, undefined, 2));
        }
    });
});

module.exports = router;
