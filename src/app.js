const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express configuration
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup for static directory to serve
app.use(express.static(publicDirectoryPath))

//setup handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Aditya Keni'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Aditya Keni'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        helpText: 'Some helpful text',
        name: 'Aditya Keni'
    })
})

//app.com/weather
app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please enter an address'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if(error) {
            return res.send({ error })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }
    
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
          })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 404,
        errorMessage: 'help article not found!',
        name: 'Aditya Keni'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 404,
        errorMessage: 'Page not found!',
        name: 'Aditya Keni'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ${port}')
})