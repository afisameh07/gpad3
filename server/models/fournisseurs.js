const mongoose =  require('mongoose');

var Fournisseurs = mongoose.model('fournisseurs', {
    nom: {type:String},
    tel: {type:String},
    description: {type:String},
});

module.exports = { Fournisseurs };