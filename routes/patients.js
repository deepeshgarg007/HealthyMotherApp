var express = require('express');
var router = express.Router();

var Patient = require('../models/patient');


router.get('/form', ensureAuthenticated, function(req, res){
	res.render('form');
});


function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

router.post('/form', function(req, res){
	var pid = req.body.pid;
	var visit = req.body.visit;
	var name = req.body.name;
	var AGE = req.body.AGE;
	var contact = req.body.contact;
	var address = req.body.address;

	// Validation
	req.checkBody('pid', 'Patient Id is required').notEmpty();
	req.checkBody('visit', 'Visit date is required').notEmpty();
	req.checkBody('name', 'Name is required').notEmpty();
	req.checkBody('AGE', 'AGE is required').notEmpty();
	req.checkBody('contact', 'Contact number is required').notEmpty();
	req.checkBody('address', 'Address is required').notEmpty();

	var errors = req.validationErrors();

	if(errors){
		res.render('form',{
			errors:errors
		});
	} else {
		var newPatient = new Patient({
			pid: pid,
			visit: visit,
			name: name,
			AGE: AGE,
			contact: contact,
			address: address
		});
		
		Patient.getPatientByPid(pid, function(err, patient){
			if(err) throw err;
			if(patient){
				req.flash('error_msg', 'Patient Id already exists');
				res.redirect('/patients/form');
			}
			else{
				Patient.createPatient(newPatient, function(err, patient){
					if(err) throw err;
					console.log(patient);
				});
				req.flash('success_msg', 'Patient is registered successfully');
				res.redirect('/users/dashboard');
			}
		});
	}
});

module.exports = router;