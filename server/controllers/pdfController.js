const express = require('express');
const excel = require('node-excel-export');

var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

const PDFDocument = require('pdfkit');
const fs = require('fs');

var { pdf } = require('../models/pdf');
var { Depences } = require('../models/depences');



function textInRowFirst(doc, text, heigth) {
    doc.y = heigth;
    doc.x = 20;
    doc.fillColor('black')
    doc.text(text, {
        paragraphGap: 5,
        indent: 5,
        align: 'justify',
        columns: 1,
    });
    return doc
}
function textInRowSecond(doc, text, heigth) {
    doc.y = heigth;
    doc.x = 137;
    doc.fillColor('black')
    doc.text(text, {
        paragraphGap: 5,
        indent: 5,
        align: 'justify',
        columns: 2,
    });
    return doc
}
function textInRow(doc, text, heigth, x) {
    doc.y = heigth;
    doc.x = x;
    doc.fillColor('black')
    doc.text(text, {
        paragraphGap: 5,
        indent: 5,
        align: 'justify'
    });
    return doc
}
function row(doc, heigth) {
    doc.lineJoin('miter')
        .rect(20, heigth, 570, 18)
        .stroke();
    return doc
}

function getlistoftypes(docs) {
    list_type_vehicules = [];
    list_vehicules = [];

    let t = "";
    for (let i = 0; i < (docs.length); i++) {
        t = docs[i].type_v;
        te = list_type_vehicules.includes(t);
        if (!te) {
            list_type_vehicules.push(t);
        }
    }
}
function insertallline(doc, ligne, typee, pourcentage_type, montantt, entretienn, reparationn, documentadm) {
    //line to the middle

    doc.lineCap('butt').moveTo(135, ligne).lineTo(135, ligne + 18).stroke();
    row(doc, ligne);
    textInRowFirst(doc, typee, ligne);
    doc.lineCap('butt').moveTo(175, ligne).lineTo(175, ligne + 18).stroke();

    textInRowSecond(doc, pourcentage_type, ligne);
    textInRow(doc, montantt, ligne, 175);

    doc.lineCap('butt').moveTo(228, ligne).lineTo(228, ligne + 18).stroke();
    textInRow(doc, entretienn, ligne, 230);

    doc.lineCap('butt').moveTo(300, ligne).lineTo(300, ligne + 18).stroke();

    textInRow(doc, reparationn, ligne, 310);
    doc.lineCap('butt').moveTo(400, ligne).lineTo(400, ligne + 18).stroke();

    textInRow(doc, documentadm, ligne, 400);
}

function getpourcentage(montant_type, somme_des_montant) {
    return ((montant_type / somme_des_montant) * 100).toFixed(1);
}
function getpourcentagevehicule(vehicule_montants,list_type_somme) {
    return ((vehicule_montants / list_type_somme) * 100).toFixed(1);
  }
// => localhost:3000/pdf/
function get_groupe_somme(ldtv_updated, type_v, groupedepence) {
    let ss = 0;
    for (let i = 0; i < (ldtv_updated.length); i++) {
        if ((ldtv_updated[i].type_v == type_v) && (ldtv_updated[i].groupedepence == groupedepence)) {
            ss += parseFloat(ldtv_updated[i].montant);
        }
    }
    return ss;
}
function  get_somme_vehicule(ldtv_updated, vee, list_dep) {
    let ss = 0;
    for (let i = 0; i < (ldtv_updated.length); i++) {
      if ((ldtv_updated[i].immat == vee) && (ldtv_updated[i].groupedepence == list_dep)) {
        ss += parseFloat(ldtv_updated[i].montant);
      }
    }
    return ss;
  }


router.get('/', (req, res) => {

    // Create a document
    const doc = new PDFDocument();

    doc.font('dist/assets/font/roboto/Roboto-Light.ttf')
        .fontSize(17)
        .text('Dépences par types de véhicules', 100, 30)
        .fontSize(12)
        .text('', 20, 50)

    insertallline(doc, 90, 'Type véhicules', '%', 'Montant', 'Entretien', 'Reparation', 'Document administratif');
    // insertallline(doc, 108, 'Type véhicules', 'Montant', 'Entretien', 'Reparation', 'Document administratif');
    // insertallline(doc, 126, 'Type véhicules', 'Montant', 'Entretien', 'Reparation', 'Document administratif');

    Depences.find({}, (err, docs) => {
        list_groupe_depences = ['Entretien', 'Reparation', 'Document administratif'];
        lignne = 90;
        list_type_somme = 0;

        if (!err) {
            // listes vehicules
            list_type_vehicules_montant = [];
            let ve = "";
            list_type_vehicules = [];
            list_vehicules = [];
            vehicule_montants = [];

            console.log(docs);

            for (let i = 0; i < (docs.length); i++) {
                t = docs[i].type_v;
                te = list_type_vehicules.includes(t);
                ve = docs[i].immat;
                if (!te) {
                    list_type_vehicules.push(t);
                }
                if (!list_vehicules.includes(ve)) {
                    list_vehicules.push(ve);
                }
            }
            for (let j = 0; j < (list_groupe_depences.length); j++) {
                list_type_vehicules_montant[j] = 0;
                for (let i = 0; i < (docs.length); i++) {
                    if (docs[i].type_v == list_type_vehicules[j]) {
                        list_type_vehicules_montant[j] += parseFloat(docs[i].montant);
                    }
                }
                list_type_somme += list_type_vehicules_montant[j];
            }

            for (let i = 0; i < (list_type_vehicules.length); i++) {
                lignne += 18;
                insertallline(doc, lignne, list_type_vehicules[i], getpourcentage(list_type_vehicules_montant[i], list_type_somme), list_type_vehicules_montant[i], get_groupe_somme(docs, list_type_vehicules[i], 'Entretien'), get_groupe_somme(docs, list_type_vehicules[i], 'Reparation'), get_groupe_somme(docs, list_type_vehicules[i], 'Document administratif'));
            }
            for (let j = 0; j < (list_vehicules.length); j++) {
                vehicule_montants[j] = 0;

                for (let i = 0; i < (docs.length); i++) {
                    if (docs[i].immat == list_vehicules[j]) {
                        vehicule_montants[j] += parseFloat(docs[i].montant);
                    }
                }
            }
            lignne = 230;
            insertallline(doc, 230, 'Véhicules', '%', 'Montant', 'Entretien', 'Reparation', 'Document administratif');

            for (let i = 0; i < (list_vehicules.length); i++) {
                lignne += 18;
                insertallline(doc, lignne, list_vehicules[i], getpourcentagevehicule(vehicule_montants[i],list_type_somme),vehicule_montants[i],get_somme_vehicule(docs, list_vehicules[i], 'Entretien'), get_somme_vehicule(docs, list_vehicules[i], 'Reparation'), get_somme_vehicule(docs, list_vehicules[i], 'Document administratif'));
            }
            console.log(list_vehicules);
            console.log(vehicule_montants);
        } else {
            console.log('erreur get data: ' + JSON.stringify(err, undefined, 2));
        }

        doc.fontSize(17)
            .text('Dépences par véhicules', 100, 200)
            .fontSize(12)
            .text('', 20, 50)

        doc.end();
        doc.pipe(res);
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id: ${req.params.id}');
    pdf.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in Retriving pdf:' + JSON.stringify(err, underfined, 2)); }
    });
});



const downloadReportfinal = function (req, res) {
   

    // Create a document
    const doc = new PDFDocument();

    doc.font('dist/assets/font/roboto/Roboto-Light.ttf')
        .fontSize(17)
        .text('Dépences par types de véhicules', 100, 30)
        .fontSize(12)
        .text('', 20, 50)

    insertallline(doc, 90, 'Type véhicules', '%', 'Montant', 'Entretien', 'Reparation', 'Document administratif');

    Depences.find({}, (err, docs) => {
        list_groupe_depences = ['Entretien', 'Reparation', 'Document administratif'];
        lignne = 90;
        list_type_somme = 0;

        if (!err) {
            // listes vehicules
            list_type_vehicules_montant = [];
            let ve = "";
            list_type_vehicules = [];
            list_vehicules = [];
            vehicule_montants = [];

            //console.log(docs);

            for (let i = 0; i < (docs.length); i++) {
                t = docs[i].type_v;
                te = list_type_vehicules.includes(t);
                ve = docs[i].immat;
                if (!te) {
                    list_type_vehicules.push(t);
                }
                if (!list_vehicules.includes(ve)) {
                    list_vehicules.push(ve);
                }
            }
            for (let j = 0; j < (list_groupe_depences.length); j++) {
                list_type_vehicules_montant[j] = 0;
                for (let i = 0; i < (docs.length); i++) {
                    if (docs[i].type_v == list_type_vehicules[j]) {
                        list_type_vehicules_montant[j] += parseFloat(docs[i].montant);
                    }
                }
                list_type_somme += list_type_vehicules_montant[j];
            }

            for (let i = 0; i < (list_type_vehicules.length); i++) {
                lignne += 18;
                insertallline(doc, lignne, list_type_vehicules[i], getpourcentage(list_type_vehicules_montant[i], list_type_somme), list_type_vehicules_montant[i], get_groupe_somme(docs, list_type_vehicules[i], 'Entretien'), get_groupe_somme(docs, list_type_vehicules[i], 'Reparation'), get_groupe_somme(docs, list_type_vehicules[i], 'Document administratif'));
            }
            for (let j = 0; j < (list_vehicules.length); j++) {
                vehicule_montants[j] = 0;

                for (let i = 0; i < (docs.length); i++) {
                    if (docs[i].immat == list_vehicules[j]) {
                        vehicule_montants[j] += parseFloat(docs[i].montant);
                    }
                }
            }
            doc.fontSize(17)
            .text('Dépences par véhicules', 100, 200)
            .fontSize(12)
            .text('', 20, 50)
            lignne = 230;
            insertallline(doc, 230, 'Véhicules', '%', 'Montant', 'Entretien', 'Reparation', 'Document administratif');
            for (let i = 0; i < (list_vehicules.length); i++) {
                lignne += 18;
                insertallline(doc, lignne, list_vehicules[i], getpourcentagevehicule(vehicule_montants[i],list_type_somme),vehicule_montants[i],get_somme_vehicule(docs, list_vehicules[i], 'Entretien'), get_somme_vehicule(docs, list_vehicules[i], 'Reparation'), get_somme_vehicule(docs, list_vehicules[i], 'Document administratif'));
            }
        } else {
            console.log('erreur get data: ' + JSON.stringify(err, undefined, 2));
        }
        doc.end();
        doc.pipe(res);
    });
};
router.post("/", downloadReportfinal);

module.exports = router;
