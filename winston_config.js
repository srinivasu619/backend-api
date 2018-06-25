var winston = require('winston');
var moment = require('moment');

var  tsFormat = () => moment.tz("Asia/Kolkata").format();

var logger = new (winston.Logger)({
  transports: [
    // colorize the output to the console
    new (winston.transports.Console)({
      timestamp:tsFormat,
      colorize: true,
      level: 'info'
    }),new winston.transports.File({
    	filename: './logs/operations.log',
    	timestamp: tsFormat,
    	json: false
	}),
  ]
});

module.exports = logger;