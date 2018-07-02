var mongoose = require('mongoose');

var PatientdSchema = mongoose.Schema({
	pid: {
		type: String,
		index:true
	},
	AGE: {
		type: Number
	},
	TRIMESTER: {
		type: Number
	},
	WEIGHT: {
		type: Number
	},
	NO_OF_PREGNANCIES: {
		type: Number
	},
	NO_OF_ABORTIONS: {
		type: Number
	},
	CONTRACTED_PELVIS: {
		type: String
	},
	PREVIOUS_LSCS: {
		type: String
	},
	AMMENORRHOEA: {
		type: String
	},
	VOMITTING: {
		type: String
	},
	WEAKNESS: {
		type: String
	},
	PAIN_IN_ABDOMEN: {
		type: String
	},
	OEDEMA_FEET: {
		type: String
	},
	LATHERGY: {
		type: String
	},
	SPOTTING_PV: {
		type: String
	},
	HEADACHE: {
		type: String
	},
	LEG_CRAMPS: {
		type: String
	},
	BURNING_IN_MICTURATION: {
		type: String
	},
	PEDAL_AND_ABDOMINAL_WALL_OEDEMA: {
		type: String
	},
	HISTORY_OF_GESTATIONAL_DM: {
		type: String
	},
	HISTORY_OF_HYPERTENSION: {
		type: String
	},
	LEAKING_PV: {
		type: String
	},
	EXCESSIVE_WEIGHT_GAIN: {
		type: String
	},
	FEVER_WITH_COLD_AND_COUGH: {
		type: String
	},
	TEMPERATURE: {
		type: Number
	},
	PULSE: {
		type: Number
	},
	BP_SYSTOLIC: {
		type: Number
	},
	BP_DIASTOLIC: {
		type: Number
	},
	BLOOD_GP: {
		type: String
	},
	HB: {
		type: Number
	},
	BL_SUGAR: {
		type: Number
	},
	TSH: {
		type: Number
	},
	URINE: {
		type: String
	},
	LIE: {
		type: String
	},
	USG: {
		type: Number
	},
	AMNIOTIC_FLUID: {
		type : String
	},
	MODE_OF_DELIVERY: {
		type : String
	},
	COMPLICATIONS: {
		type : String
	},
	TREATMENT: {
		type : String
	}
});

var Patientd = module.exports = mongoose.model('Patientd', PatientdSchema);

module.exports.createPatientd = function(newPatientd, callback){
	newPatientd.save(callback);
}

module.exports.getPatientdByPid = function(pid, callback){
	var query = {pid: pid};
	Patientd.findOne(query, callback);
}