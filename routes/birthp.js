var MongoClient = require('mongodb').MongoClient;
var express = require('express');
var router = express.Router();
var Patient = require('../models/patient');


router.get('/form4', ensureAuthenticated, function(req, res){
	res.render('form4');
});

router.get('/results',ensureAuthenticated, function(req, res){
	res.render('results');
});


function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

router.post('/form4', function(req, res){
	var age = req.body.age;
	var weight_mother = req.body.weight_mother;
	var smoke_status=req.body.smoke_status;
	var hist_premature_labor=req.body.hist_premature_labor;
	var history_hypertension=req.body.history_hypertension;
	var uterine_irritability=req.body.uterine_irritability;
	

	// Validation
	req.checkBody('pid', 'Patient Id is required').notEmpty();

	var errors = req.validationErrors();

	if(errors){
		res.render('form4',{
			errors:errors
		});
	}else{ 
		
		Patient.getPatientByPid(pid, function(err, patient){
			if(err) throw err;
			if(patient){
				
				var dataString = '';
				
				pyshell.send(JSON.stringify());
				
				pyshell.on('message', function (message) {
					dataString += message.toString();
				});
			}
			else{
				req.flash('error_msg', 'Unknown Patient Id');
				res.redirect('/reports/form3');
			}
		});
	}
});

module.exports = router;