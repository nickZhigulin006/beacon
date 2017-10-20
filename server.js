const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const studentRouter = require('./server/api/student');
const app = express();

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

// API location
console.log('1111');
app.use('/api/student', studentRouter);
// Send all other requests to the Angular app
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './dist/index.html'));
});

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);
const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));
