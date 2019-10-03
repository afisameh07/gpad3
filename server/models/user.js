const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: String,
	grade: String,
	email: String,
	pwd: String
});

module.exports = mongoose.model('user', userSchema, 'utilisateurs');