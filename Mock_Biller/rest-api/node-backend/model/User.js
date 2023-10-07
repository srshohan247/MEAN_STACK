const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let User = new Schema ({
	username:{
		type:String
	},
	name:{
		type:String
	},
	msisdn:{
		type:String
	},
	email:{
		type:String
	},
	type:{
		type:String
	},
	role:{
		type:String
	},
	pass:{
		type:String
	}
},
{
	collection:'users'
})
module.exports = mongoose.model('User', User)