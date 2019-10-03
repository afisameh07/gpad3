const mongoose =  require('mongoose');

var Pdf = mongoose.model('Pdf', {
    matriculation: {type:String},
    typee: {type:String},
    marquee: {type:String},
    modelee: {type:String},
    servicee: {type:String},
    datacirculation: {type:String},
});

module.exports = { Pdf };