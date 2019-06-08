const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors());

require('./app/routes')(app);

app.listen(port, () => {
	/* eslint-disable no-console */
	console.log('We are live on ' + port + ' port');
	/* eslint-enable no-console */
});