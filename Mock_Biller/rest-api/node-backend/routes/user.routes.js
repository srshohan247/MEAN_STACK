const express = require("express");
const app = express();
const userRoute = express.Router();
let User = require("../model/User");
//addUser
userRoute.route('/add-user').post((req, res, next) => {
	User.create(req.body, (error, data) => {
		if(error){
			return next(error)
		}else{
			res.json(data)
		}
	});
});
//get All user
userRoute.route('/').get((req, res) => {
	User.find((error, data) => {
		if(error){
			return next(error)
		}else{
			res.json(data)
		}
	});
});

//getuser by ID
userRoute.route('/get-user/:id').get((req, res) => {
	User.findById(req.params.id,(error, data) => {
		if(error){
			return next(error)
		}else{
			res.json(data)
		}
	});
});

//update User
userRoute.route('/update-user/:id').put((req, res, next) => {
	User.findByIdAndUpdate(req.params.id,{$set: req.body},(error, data) => {
		if(error){
			return next(error)
		}else{
			res.json(data)
		}
	});
});

//delete User
userRoute.route('/delete-user/:id').put((req, res, next) => {
	User.findByIdAndRemove(req.params.id,(error, data) => {
		if(error){
			return next(error)
		}else{
			res.status(200).json({msg: data})
		}
	});
});
module.exports = userRoute;
