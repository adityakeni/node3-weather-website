const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/ee7aad5e0ff0522f56f45e753dda88a9/' + latitude + ',' + longitude + '?units=si'
    
    request({ url, json: true}, (error, { body }) => {
        if(error) {
            callback('Unable to connect to weather services!', undefined)
        } else if(body.error){
            callback('Unable to find the location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degrees. There is ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast