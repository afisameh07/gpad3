const express = require('express');
const Excel = require('exceljs/modern.nodejs');

var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

const fs = require('fs');

var { Depences } = require('../models/depences');

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

function getpourcentage(montant_type, somme_des_montant) {
    return ((montant_type / somme_des_montant) * 100).toFixed(1);
}
function getpourcentagevehicule(vehicule_montants, list_type_somme) {
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
function get_somme_vehicule(ldtv_updated, vee, list_dep) {
    let ss = 0;
    for (let i = 0; i < (ldtv_updated.length); i++) {
        if ((ldtv_updated[i].immat == vee) && (ldtv_updated[i].groupedepence == list_dep)) {
            ss += parseFloat(ldtv_updated[i].montant);
        }
    }
    return ss;
}

function somme_callb(x, y) {
    return x + y;
}
function moin_callb(x, y) {
    return x - y;
}
router.get('/', (req, res) => {


    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('ExampleSheet');

    worksheet.columns = [
        { header: 'Package', key: 'package_name' },
        { header: 'Author', key: 'author_name' }
    ];

    worksheet.addRow(
        { package_name: "ABC", author_name: "Author 1" },
        { package_name: "XYZ", author_name: "Author 2" }
    );

    // Add rows as Array values
    worksheet
        .addRow(["BCD", "Author Name 3"]);

    // Add rows using both the above of rows
    const rows = [
        ["FGH", "Author Name 4"],
        { package_name: "PQR", author_name: "Author 5" }
    ];
    worksheet
        .addRows(rows);
    // save workbook to disk
    workbook.xlsx.writeFile('gpad.xlsx').then(() => {
        console.log("saved");
        //res.attachment('gpad.xlsx');
        //return res.send();
        //console.log('save workbook to disk');

    })
        .catch((err) => {
            console.log("err", err);
        });
});
const downloadexcel = function (req, res) {

    const workbook = new Excel.Workbook();
    const worksheet = workbook.addWorksheet('Depences par types de vehicules');
    worksheet.mergeCells('A1:g1');
    // Add rows as Array values

    worksheet.columns = [
        { header: ' ', width: 20 },
    ];
    worksheet.columns = [
        { header: 'Types véhicules', width: 23 },
        { header: '%', width: 10 },
        { header: 'Montant', width: 10 },
        { header: 'Entretien', width: 23 },
        { header: 'Reparation', width: 23 },
        { header: 'Document administratif', width: 23 },
    ];

    Depences.find({}, (err, docs) => {
        list_groupe_depences = ['Entretien', 'Reparation', 'Document administratif'];
        lignne = 90;
        list_type_somme = 0;

        somme_callb(1, 5).then({
        });
        
        if (!err) {
            // listes vehicules
            list_type_vehicules_montant = [];
            let ve = "";
            list_type_vehicules = [];
            list_vehicules = [];
            vehicule_montants = [];

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
                console.log(list_vehicules);

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

            for (let j = 0; j < (list_vehicules.length); j++) {
                vehicule_montants[j] = 0;

                for (let i = 0; i < (docs.length); i++) {
                    if (docs[i].immat == list_vehicules[j]) {
                        vehicule_montants[j] += parseFloat(docs[i].montant);
                    }
                }

            }
            for (let i = 0; i < (list_vehicules.length); i++) {
                worksheet.addRow(['dg df', 'dg df', 'dg df', 'dg df', 'dg df', 'dg df']);


                // insertallline(doc, lignne, list_vehicules[i], getpourcentagevehicule(vehicule_montants[i],list_type_somme),vehicule_montants[i],get_somme_vehicule(docs, list_vehicules[i], 'Entretien'), get_somme_vehicule(docs, list_vehicules[i], 'Reparation'), get_somme_vehicule(docs, list_vehicules[i], 'Document administratif'));
            }
        } else {
            console.log('erreur get data: ' + JSON.stringify(err, undefined, 2));
        }
    });


    worksheet
        .addRow(['dg df', 'dg df', 'dg df', 'dg df', 'dg df', 'dg df']);





    // save workbook to disk
    workbook.xlsx.writeFile('gpad2.xlsx').then(() => {
        res.attachment('gpad.xlsx');
        res.download('gpad2.xlsx');

        return res.send();

        //console.log('save workbook to disk');

    })
        .catch((err) => {
            console.log("err", err);
        });
}
router.post("/", downloadexcel);
module.exports = router;
