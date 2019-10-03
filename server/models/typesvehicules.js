const mongoose =  require('mongoose');

var Typee = mongoose.model('typesvehicules', {
    nom: {type:String},
});

module.exports = { Typee };