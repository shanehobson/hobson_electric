const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const emailer = require('./emailer');

const port = process.env.PORT || 3000;

const app = express();

app.use(express.static(__dirname + '/public'));

//load homepage
app.get('/', (req, res) => {
    res.send('index.html');
});

//load about page
app.get('/about', (req, res) => {
    res.send('about.html');
});

//load commercial page
app.get('/commercial', (req, res) => {
    res.send('commercial.html');
});

//load residential page
app.get('/residential', (req, res) => {
    res.send('residential.html');
});

//middleware for parsing request body
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//handler to respond to post request from client & send email
app.post('/', (req, res) => {
    console.log('Request received.');
    console.log(req.body);
    
    //call send email function
    emailer.sendEmail(req, res);
});

app.post('/commercial', (req, res) => {
    console.log('Request received.');
    console.log(req.body);
    
    //call send email function
    emailer.sendEmail(req, res);
});

app.listen(port, () => {
    console.log(`Server is up on ${port}`);
});