var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//var ObjectId = Schema.ObjectId;

var AcroExpansionSchema = new Schema({
	Acronym: { type: String },
	Expansion: { type: String }
},{
	collection : "acronym_expansion"
});

module.exports = mongoose.model('Acronym_Expansion',AcroExpansionSchema);