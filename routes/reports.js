var MongoClient = require('mongodb').MongoClient;
var express = require('express');
var router = express.Router();
var Patient = require('../models/patient');


router.get('/form3', ensureAuthenticated, function(req, res){
	res.render('form3');
});



function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

router.post('/form3', function(req, res){
	var pid = req.body.pid;

	// Validation
	req.checkBody('pid', 'Patient Id is required').notEmpty();

	var errors = req.validationErrors();

	if(errors){
		res.render('form3',{
			errors:errors
		});
	}else{ 
		
		Patient.getPatientByPid(pid, function(err, patient){
			if(err) throw err;
			if(patient){
				
				MongoClient.connect('mongodb://localhost/healthymother', function(err, db) {
					var dbo = db.db("healthymother");
					var query = { pid: pid };
					dbo.collection("patientps").find(query).toArray(function(err, result) {
					if (err) throw err;
					
					router.get('/print',ensureAuthenticated, function(req, res){
						res.render('print',{ info:result
						});
					});
					res.redirect('/reports/print');
					console.log(result);
					});
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
