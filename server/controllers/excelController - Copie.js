const express = require('express');
const excel = require('node-excel-export');

var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

const PDFDocument = require('pdfkit');
const fs = require('fs');

var { pdf } = require('../models/pdf');
var { Depences } = require('../models/depences');

router.get('/', (req, res) => {

    // You can define styles as json object
    const styles = {
        headerDark: {
            fill: {
                fgColor: {
                    rgb: 'FF000000'
                }
            },
            font: {
                color: {
                    rgb: 'FFFFFFFF'
                },
                sz: 14,
                bold: true,
                underline: true
            }
        },
        cellPink: {
            fill: {
                fgColor: {
                    rgb: 'FFFFCCFF'
                }
            }
        },
        cellGreen: {
            fill: {
                fgColor: {
                    rgb: 'FF00FF00'
                }
            }
        }
    };

    //Array of objects representing heading rows (very top)
    const heading = [
        [{ value: 'a1', style: styles.headerDark }, { value: 'b1', style: styles.headerDark }, { value: 'c1', style: styles.headerDark }],
        ['a2', 'b2', 'c2'] // <-- It can be only values
    ];

    //Here you specify the export structure
    const specification = {
        customer_name: { // <- the key should match the actual data key
            displayName: 'Customer', // <- Here you specify the column header
            headerStyle: styles.headerDark, // <- Header style
            cellStyle: function (value, row) { // <- style renderer function
                // if the status is 1 then color in green else color in red
                // Notice how we use another cell value to style the current one
                return (row.status_id == 1) ? styles.cellGreen : { fill: { fgColor: { rgb: 'FFFF0000' } } }; // <- Inline cell style is possible 
            },
            width: 150 // <- width in pixels
        },
        status_id: {
            displayName: 'Status',
            headerStyle: styles.headerDark,
            cellFormat: function (value, row) { // <- Renderer function, you can access also any row.property
                return (value == 1) ? 'Active' : 'Inactive';
            },
            width: '10' // <- width in chars (when the number is passed as string)
        },
        note: {
            displayName: 'Description',
            headerStyle: styles.headerDark,
            cellStyle: styles.cellPink, // <- Cell style
            width: 220 // <- width in pixels
        }
    }

    // The data set should have the following shape (Array of Objects)
    // The order of the keys is irrelevant, it is also irrelevant if the
    // dataset contains more fields as the report is build based on the
    // specification provided above. But you should have all the fields
    // that are listed in the report specification
    const dataset = [
        { customer_name: 'IBM', status_id: 1, note: 'some note', misc: 'not shown' },
        { customer_name: 'HP', status_id: 0, note: 'some note' },
        { customer_name: 'MS', status_id: 0, note: 'some note', misc: 'not shown' }
    ]

    // Define an array of merges. 1-1 = A:1
    // The merges are independent of the data.
    // A merge will overwrite all data _not_ in the top-left cell.
    const merges = [
        { start: { row: 1, column: 1 }, end: { row: 1, column: 10 } },
        { start: { row: 2, column: 1 }, end: { row: 2, column: 5 } },
        { start: { row: 2, column: 6 }, end: { row: 2, column: 10 } }
    ]

    // Create the excel report.
    // This function will return Buffer
    const report = excel.buildExport(
        [ // <- Notice that this is an array. Pass multiple sheets to create multi sheet report
            {
                name: 'Depences', // <- Specify sheet name (optional)
                heading: heading, // <- Raw heading array (optional)
                merges: merges, // <- Merge cell ranges
                specification: specification, // <- Report specification
                data: dataset // <-- Report data
            }
        ]
    );

    // You can then return this straight
    res.attachment('gpad.xlsx'); // This is sails.js specific (in general you need to set headers)
    return res.send(report);
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('No record with given id: ${req.params.id}');
    pdf.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); } else { console.log('Error in Retriving pdf:' + JSON.stringify(err, underfined, 2)); }
    });
});



const downloadReportfinal = function (req, res) {

    // You can define styles as json object
    const styles = {
        headerDark: {
            fill: {
                fgColor: {
                    rgb: 'FF000000'
                }
            },
            font: {
                color: {
                    rgb: 'FFFFFFFF'
                },
                sz: 14,
                bold: true,
                underline: true
            }
        },
        cellPink: {
            fill: {
                fgColor: {
                    rgb: 'FFFFCCFF'
                }
            }
        },
        cellGreen: {
            fill: {
                fgColor: {
                    rgb: 'FF00FF00'
                }
            }
        }
    };

    //Array of objects representing heading rows (very top)
    const heading = [
        ['','','','Depences par types de vehicules', ''] // <-- It can be only values
    ];

    //Here you specify the export structure
    const specification = {
        typevehicule: { // <- the key should match the actual data key
            displayName: 'Type véhicules', // <- Here you specify the column header
            cellStyle: styles.cellPink,
            width: 200, // <- width in pixels
        },
        pourc: {
            displayName: '%',
            cellStyle: styles.cellPink, // <- Cell style
            width: 80 // <- width in pixels
        },
        montant: {
            displayName: 'Montant',
            cellStyle: styles.cellPink, // <- Cell style
            width: 100 // <- width in pixels
        },
        entretien: {
            displayName: 'Entretien',
            cellStyle: styles.cellPink, // <- Cell style
            width: 150 // <- width in pixels
        },
        reparation: {
            displayName: 'Reparation',
            cellStyle: styles.cellPink, // <- Cell style
            width: 150 // <- width in pixels
        },
        doc: {
            displayName: 'Document',
            cellStyle: styles.cellPink, // <- Cell style
            width: 150 // <- width in pixels
        }
    }
    const dataset = [
        { typevehicule: 'Type véhicules', pourc : '%', montant : 'Montant', entretien : 'Entretien', reparation : 'Reparation', doc : 'Document administratif'},
    ]
    const merges = [
    ]
    const report = excel.buildExport(
        [ 
            {
                name: 'Dépences', 
                heading: heading, 
                merges: merges, 
                specification: specification, 
                data: dataset 
            }
        ]
    );
    res.attachment('gpad.xlsx');
    return res.send(report);
};
router.post("/", downloadReportfinal);
module.exports = router;
