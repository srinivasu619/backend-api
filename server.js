var express = require('express');
var fs = require('fs')
var morgan = require('morgan')
var path = require('path')
var dotenv = require('dotenv');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var logger = require('./winston_config');
var moment = require('moment-timezone');
var app = express();
dotenv.load();

mongoose.connect(process.env.ONLINE_MONGO_DB_URI,function(err){
	if(err)
		{
			logger.error("Error While Connecting Database : Internal Server Error" + " : " + err.name + " : " + err.message);
		}
	else
		{
			logger.info("Successfully Connected to the Database");
		}
});
app.use(morgan('dev'));
morgan.token('date', (req, res, tz) => {
	return moment().tz(tz).format();
  })
morgan.format('myformat', ':date[Asia/Kolkata] ":method :url" :status :res[content-length] - :response-time ms');
app.use(morgan('myformat', {
				stream: fs.createWriteStream(path.join(__dirname, 'logs/operations.log'), {flags: 'a'})
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods","GET,POST,OPTIONS,DELETE,PUT");
  next();
});
app.use('/api', require('./routes/api'));


app.listen(process.env.PORT,function(){
    console.log('App Running at port 3000');
})