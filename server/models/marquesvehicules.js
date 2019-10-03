const mongoose =  require('mongoose');

var Marques = mongoose.model('marquesvehicules', {
    nom: {type:String},
});

module.exports = { Marques };