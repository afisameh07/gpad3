const mongoose = require('mongoose');

var Depences = mongoose.model('depences', {

    dad: { type: String },
    dad_date: { type: String },
    bc: { type: String },
    bc_date: { type: String },
    immat: { type: String },
    libelle: { type: String },
    description: { type: String },
    montant: { type: String },
    facture: { type: String },
    fournisseur: { type: String },
    intervention_date: { type: String },

});

module.exports = { Depences };