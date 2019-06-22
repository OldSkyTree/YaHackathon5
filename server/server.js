const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

app.use('/dist', express.static(path.join(__dirname, '/../dist')));
app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, '/../index.html'));
});

require('./app/routes')(app);

app.listen(process.env.PORT || port, () => {
	/* eslint-disable no-console */
	console.log('We are live on ' + port + ' port');
	/* eslint-enable no-console */
});