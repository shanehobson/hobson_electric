const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const config = require('./config');
const password = config.password;

const port = 3000;

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
    
    const name = req.body.name;
    const phone = req.body.number;
    const email = req.body.email;
    const message = req.body.message;

    //define send email function
    function sendEmail(req, res) {
        
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'hobsonelectricinc@gmail.com', // Your email id
                pass: password // Your password
            }
        });

        const html = `
            <h3>You've Received an Inquiry From ${name}</h3>
            <p>Name: ${name}</p>
            <p>Phone Number: ${phone}</p>
            <p>Email Address: ${email}</p>
            <p>Message: ${message}</p>
        `;

        const mailOptions = {
            from: 'hobsonelectricinc@gmail.com', // sender address
            to: 'shanehobson1@gmail.com', // list of receivers
            subject: `New Website Inquiry from ${name}`, // Subject line...New Website Inquiry from ${name}
            // text: text //, // plaintext body
            html: html
        };

        transporter.sendMail(mailOptions, function(error, info) {
            if(error){
                console.log(error);
                res.json({yo: 'error'});
            }else{
                console.log('Message sent: ' + info.response);
                res.json({yo: info.response});
            };
        });
    }

    //call send email function
    sendEmail(req, res);

    //reply to browser so no error message pops up
    res.send();
});

app.listen(port, function () {
    console.log(`Server is up on ${port}`);
});