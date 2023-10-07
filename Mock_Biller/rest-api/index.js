let express = require('express'),
path = require('path'),
mongoose = require('mongoose'),
cors = require('cors'),
bodyParser = require('body-parser'),
mongoDb = require('./database/db');
mongoose.Promise = global.Promise;
console.log(mongoDb);
mongoose.connect(mongoDb.db, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(() => {
	console.log("Database Connected")
},
error => {
	console.log("Databse connection error! Detail: "+error)
})

const userRoute = require("./node-backend/routes/user.routes");
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false
}));

app.use(cors());
//static path
app.use(express.static(path.join(__dirname, 'dist/MockBiller')));
//API Root
app.use('/api', userRoute);
//port
const port = process.env.port || 8000;
app.listen(port,() => {
	console.log('Listening to port: '+ port);
});

app.use((req,res,next) => {
	next(createError(404));
});
//Base route
app.get('*',(req,res) => {
	res.sendFile(path.join(__dirname, 'dist/MockBiller/index.html'));
});
app.use(function(err, req, res, next){
	console.error(err.message);
	if(!err.statusCode) err.statusCode = 500;
	res.status(err.statusCode).send(err.message);
});