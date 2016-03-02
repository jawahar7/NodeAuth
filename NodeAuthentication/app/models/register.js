var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RegisterSchema = new Schema({
	username: {type: String, unique: true},
	password: String
});

mongoose.model('Register', RegisterSchema);