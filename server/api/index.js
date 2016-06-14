var mongoose = require('mongoose');
var _ = require('underscore');
var database = require('../config/database');

var AcroExpansion = require('./models/acronym_expansion.js');

mongoose.connect(database.url);
mongoose.connection.on('error', console.error.bind(console, 'connection error:')); // Error handler
var db = mongoose.connection;

exports.searchAcronym = function (req,res,next){
	var query = req.query.q;

	query = new RegExp(query, "i");
	AcroExpansion
	.find({ "Acronym": query })
	.exec(function(err,model){
		if( _.isNull(err) && model.length >= 0 ){
			res.status(200).send({ status: true, message: 'Acronyms found', n: model.length, data: model });
		}
		else{
			res.status(500).send({ status:false, message: 'Some Error has occured' });
		}
	});
}

exports.createAcronym = function(req,res,next){

	if(req.body.acronym == undefined || req.body.expansion == undefined || req.body.acronym ==null || req.body.expansion == null || req.body.acronym == '' || req.body.expansion == '')
	{
		return res.status(500).send({ status:false, message:'Parameter Problem' });
	}

	var params = {
		"Acronym": req.body.acronym.toUpperCase(),
		"Expansion": req.body.expansion
	};

	AcroExpansion.create(params, function (err,model){
		if(err || model==null || model==undefined)
		{
			return res.status(500).send({ status:false, message: 'Critical Error' });
		}
		else
		{
			return res.status(200).send({ status:true, message: 'creation successful', data: model });
		}
	});
}