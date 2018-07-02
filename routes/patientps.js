var express = require('express');
var router = express.Router();
var PythonShell = require('python-shell');

var Patientp = require('../models/patientp');
var Patient = require('../models/patient');

router.get('/form2', ensureAuthenticated, function(req, res){
	res.render('form2');
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

router.post('/form2', function(req, res){
	var pyshell = new PythonShell('routes/file2.py');
	var pyshellc = new PythonShell('routes/comp.py');
	var pyshellt = new PythonShell('routes/treat.py');
	var pid = req.body.pid;
	var AGE = req.body.AGE;
	var TRIMESTER = req.body.TRIMESTER;
	var WEIGHT = req.body.WEIGHT;
	var NO_OF_PREGNANCIES = req.body.NO_OF_PREGNANCIES;
	var NO_OF_ABORTIONS = req.body.NO_OF_ABORTIONS;
	var CONTRACTED_PELVIS = req.body.CONTRACTED_PELVIS;
	var PREVIOUS_LSCS = req.body.PREVIOUS_LSCS;
	var AMMENORRHOEA = req.body.AMMENORRHOEA;
	var VOMITTING = req.body.VOMITTING;
	var WEAKNESS = req.body.WEAKNESS;
	var PAIN_IN_ABDOMEN = req.body.PAIN_IN_ABDOMEN;
	var OEDEMA_FEET = req.body.OEDEMA_FEET;
	var LATHERGY = req.body.LATHERGY;
	var SPOTTING_PV = req.body.SPOTTING_PV;
	var HEADACHE = req.body.HEADACHE;
	var LEG_CRAMPS = req.body.LEG_CRAMPS;
	var BURNING_IN_MICTURATION = req.body.BURNING_IN_MICTURATION;
	var PEDAL_AND_ABDOMINAL_WALL_OEDEMA = req.body.PEDAL_AND_ABDOMINAL_WALL_OEDEMA;
	var HISTORY_OF_GESTATIONAL_DM = req.body.HISTORY_OF_GESTATIONAL_DM;
	var HISTORY_OF_HYPERTENSION = req.body.HISTORY_OF_HYPERTENSION;
	var LEAKING_PV = req.body.LEAKING_PV;
	var EXCESSIVE_WEIGHT_GAIN = req.body.EXCESSIVE_WEIGHT_GAIN;
	var FEVER_WITH_COLD_AND_COUGH = req.body.FEVER_WITH_COLD_AND_COUGH;
	var TEMPERATURE = req.body.TEMPERATURE;
	var PULSE = req.body.PULSE;
	var BP_SYSTOLIC = req.body.BP_SYSTOLIC;
	var BP_DIASTOLIC = req.body.BP_DIASTOLIC;
	var BLOOD_GP = req.body.BLOOD_GP;
	var HB = req.body.HB;
	var BL_SUGAR = req.body.BL_SUGAR;
	var TSH = req.body.TSH;
	var URINE = req.body.URINE;
	var LIE = req.body.LIE;
	var USG = req.body.USG;
	var AMNIOTIC_FLUID = req.body.AMNIOTIC_FLUID;

	// Validation
	req.checkBody('pid', 'Patient Id is required').notEmpty();

	var errors = req.validationErrors();

	if(errors){
		res.render('form2',{
			errors:errors
		});
	}else{ 
		
		Patient.getPatientByPid(pid, function(err, patient){
			if(err) throw err;
			if(patient){
				var dataString = '';
				var dataString1 = '';
				var dataString2 = '';
				
				pyshell.send(JSON.stringify([AGE,TRIMESTER,WEIGHT,NO_OF_PREGNANCIES,NO_OF_ABORTIONS,CONTRACTED_PELVIS,PREVIOUS_LSCS,AMMENORRHOEA,VOMITTING,WEAKNESS,PAIN_IN_ABDOMEN,OEDEMA_FEET,LATHERGY,SPOTTING_PV,HEADACHE,LEG_CRAMPS,BURNING_IN_MICTURATION,PEDAL_AND_ABDOMINAL_WALL_OEDEMA,HISTORY_OF_GESTATIONAL_DM,HISTORY_OF_HYPERTENSION,LEAKING_PV,EXCESSIVE_WEIGHT_GAIN,FEVER_WITH_COLD_AND_COUGH,TEMPERATURE,PULSE,BP_SYSTOLIC,BP_DIASTOLIC,BLOOD_GP,HB,BL_SUGAR,TSH,URINE,LIE,USG,AMNIOTIC_FLUID]));
				
				pyshell.on('message', function (message) {
					dataString += message.toString();
				});
				
				pyshellc.send(JSON.stringify([AGE,TRIMESTER,WEIGHT,NO_OF_PREGNANCIES,NO_OF_ABORTIONS,CONTRACTED_PELVIS,PREVIOUS_LSCS,AMMENORRHOEA,VOMITTING,WEAKNESS,PAIN_IN_ABDOMEN,OEDEMA_FEET,LATHERGY,SPOTTING_PV,HEADACHE,LEG_CRAMPS,BURNING_IN_MICTURATION,PEDAL_AND_ABDOMINAL_WALL_OEDEMA,HISTORY_OF_GESTATIONAL_DM,HISTORY_OF_HYPERTENSION,LEAKING_PV,EXCESSIVE_WEIGHT_GAIN,FEVER_WITH_COLD_AND_COUGH,TEMPERATURE,PULSE,BP_SYSTOLIC,BP_DIASTOLIC,BLOOD_GP,HB,BL_SUGAR,TSH,URINE,LIE,USG,AMNIOTIC_FLUID]));
				
				pyshellc.on('message', function (message) {
					dataString1 += message.toString();
				});
				
				pyshellt.send(JSON.stringify([AGE,TRIMESTER,WEIGHT,NO_OF_PREGNANCIES,NO_OF_ABORTIONS,CONTRACTED_PELVIS,PREVIOUS_LSCS,AMMENORRHOEA,VOMITTING,WEAKNESS,PAIN_IN_ABDOMEN,OEDEMA_FEET,LATHERGY,SPOTTING_PV,HEADACHE,LEG_CRAMPS,BURNING_IN_MICTURATION,PEDAL_AND_ABDOMINAL_WALL_OEDEMA,HISTORY_OF_GESTATIONAL_DM,HISTORY_OF_HYPERTENSION,LEAKING_PV,EXCESSIVE_WEIGHT_GAIN,FEVER_WITH_COLD_AND_COUGH,TEMPERATURE,PULSE,BP_SYSTOLIC,BP_DIASTOLIC,BLOOD_GP,HB,BL_SUGAR,TSH,URINE,LIE,USG,AMNIOTIC_FLUID]));
				
				pyshellt.on('message', function (message) {
					dataString2 += message.toString();
				});


				pyshell.end(function (err) {
					if (err){
						throw err;
					};
					req.flash('mode', dataString);
				});
				
				pyshellc.end(function (err) {
					if (err){
						throw err;
					};
					req.flash('comp', dataString1);
				});
				
				pyshellt.end(function (err) {
					if (err){
						throw err;
					};
					req.flash('treat', dataString2);
					
					var newPatientp = new Patientp({
					pid: pid,
					AGE: AGE,
					TRIMESTER: TRIMESTER,
					WEIGHT: WEIGHT,
					NO_OF_PREGNANCIES: NO_OF_PREGNANCIES,
					NO_OF_ABORTIONS: NO_OF_ABORTIONS,
					CONTRACTED_PELVIS:CONTRACTED_PELVIS,
					PREVIOUS_LSCS:PREVIOUS_LSCS,
					AMMENORRHOEA:AMMENORRHOEA,
					VOMITTING:VOMITTING,
					WEAKNESS:WEAKNESS,
					PAIN_IN_ABDOMEN:PAIN_IN_ABDOMEN,
					OEDEMA_FEET:OEDEMA_FEET,
					LATHERGY:LATHERGY,
					SPOTTING_PV:SPOTTING_PV,
					HEADACHE:HEADACHE,
					LEG_CRAMPS:LEG_CRAMPS,
					BURNING_IN_MICTURATION:BURNING_IN_MICTURATION,
					PEDAL_AND_ABDOMINAL_WALL_OEDEMA:PEDAL_AND_ABDOMINAL_WALL_OEDEMA,
					HISTORY_OF_GESTATIONAL_DM:HISTORY_OF_GESTATIONAL_DM,
					HISTORY_OF_HYPERTENSION:HISTORY_OF_HYPERTENSION,
					LEAKING_PV:LEAKING_PV,
					EXCESSIVE_WEIGHT_GAIN:EXCESSIVE_WEIGHT_GAIN,
					FEVER_WITH_COLD_AND_COUGH:FEVER_WITH_COLD_AND_COUGH,
					TEMPERATURE,TEMPERATURE,
					PULSE:PULSE,
					BP_SYSTOLIC:BP_SYSTOLIC,
					BP_DIASTOLIC:BP_DIASTOLIC,
					BLOOD_GP:BLOOD_GP,
					HB:HB,
					BL_SUGAR:BL_SUGAR,
					TSH:TSH,
					URINE:URINE,
					LIE:LIE,
					USG:USG,
					AMNIOTIC_FLUID:AMNIOTIC_FLUID,
					MODE_OF_DELIVERY:dataString,
					COMPLICATIONS:dataString1,
					TREATMENT:dataString2
					});
					Patientp.createPatientp(newPatientp, function(err, patientp){
						if(err) throw err;
						console.log(patientp);
					});
					res.redirect('/patientps/results');
				});
			}
			else{
				req.flash('error_msg', 'Unknown Patient Id');
				res.redirect('/patientps/form2');
			}
		});
	}
});

module.exports = router;