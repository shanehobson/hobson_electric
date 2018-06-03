const nodemailer = require('nodemailer');
const config = require('./config');
const password = config.password;

module.exports.sendEmail = (req, res) => {
    const name = req.body.name;
    const phone = req.body.number;
    const email = req.body.email;
    const message = req.body.message;
    
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
        subject: `New Website Inquiry from ${name}`, // Subject line
        html: html
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.log(error);
            res.json({yo: 'error'});
        }else{
            console.log('Message sent: ' + info.response);
            res.json({yo: info.response});
        };
    });
    res.send('Success');
}