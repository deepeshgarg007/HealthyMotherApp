var mongoose = require('mongoose');

var PatientSchema = mongoose.Schema({
	pid: {
		type: String,
		index:true
	},
	visit: {
		type: { type: Date, default: Date.now }
	},
	name: {
		type: String
	},
	AGE: {
		type: Number
	},
	contact: {
		type: Number
	},
	address: {
		type: String
	}
});

var Patient = module.exports = mongoose.model('Patient', PatientSchema);

module.exports.createPatient = function(newPatient, callback){
	newPatient.save(callback);
}

module.exports.getPatientByPid = function(pid, callback){
	var query = {pid: pid};
	Patient.findOne(query, callback);
}