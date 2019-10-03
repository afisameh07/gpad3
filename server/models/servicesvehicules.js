const mongoose =  require('mongoose');

var Services = mongoose.model('servicesvehicules', {
    nom: {type:String},
});

module.exports = { Services };