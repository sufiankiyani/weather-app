const request = require ('request')

const weather = (longt, latit, callback) => {
    const url = `https://api.darksky.net/forecast/e9b114b1d6c1927fd7504c7c79135a41/${longt},${latit}`

    request( {url , json: true}, (error , {body}) => {
        if (error) {
            callback('Unable to connect to weather')
        } else if (body.error) {
            callback('Unable to fetch location')
        } else {
            callback(undefined , `${body.daily.data[0].summary} It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain.`)
        }


    })
}

module.exports = weather
