const mongoose =  require('mongoose');

var Vehicules = mongoose.model('Vehicules', {
    matriculation: {type:String},
    typee: {type:String},
    marquee: {type:String},
    modelee: {type:String},
    servicee: {type:String},
    datacirculation: {type:String},
});

module.exports = { Vehicules };