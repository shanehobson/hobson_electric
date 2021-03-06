const express = require('express');

const port = process.env.PORT || 3000;

const app = express();

//Enable CORS
const allowCrossDomain = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);

app.use(express.static(__dirname + '/dist'));

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

app.listen(port, () => {
    console.log(`Server is up on ${port}`);
});