const mongoose =  require('mongoose');

var Utilisateurs = mongoose.model('Utilisateurs', {
    name: {type:String},
    email: {type:String},
    adresse: {type:String},
    tel: {type:String},
    cin: {type:String},
    pwd: {type:String},
    grade: {type:String}
});

module.exports = { Utilisateurs };