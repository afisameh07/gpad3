const mongoose =  require('mongoose');

var Modeles = mongoose.model('modelesvehicules', {
    nom: {type:String},
});

module.exports = { Modeles };