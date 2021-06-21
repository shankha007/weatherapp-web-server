const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

// Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Shankha'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Shankha'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Shankha',
        helpMsg: 'This is a help message.'
    });
});

app.get('/weather', (req, res) => {
    res.send({
        forecast: 'Sunny',
        location: 'Kolkata, India'
    });
});

app.get('/help/*', (req, res) => {
    res.render('notFound', {
        title: '404 Not Found',
        name: 'Shankha',
        errorText: 'Help Article not found'
    });
});

app.get('*', (req, res) => {
    res.render('notFound', {
        title: '404 Not Found',
        name: 'Shankha',
        errorText: 'Page not found'
    });
});

app.listen(3000, () => {
    console.log('Server is up on port 3000!');
});