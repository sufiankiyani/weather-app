const request = require ('request')

const geoCode = (address , callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?limit=2&access_token=pk.eyJ1IjoicHVnbGFhIiwiYSI6ImNqeWttMHFvMzBlbjUzYmxsb3Rmc2lqcTMifQ.b1mQlO06uB8T-PPjZdWjRg`

    request ({url , json: true} , (error , {body}) => {
        if(error) {
            callback('Unable to connect to location')
        } else if(body.features.length === 0){
            callback('unable to find location')
        } else {
            callback(undefined , {
                longt : body.features[0].center[0] ,
                latit : body.features[0].center[1] ,
                loc   : body.features[0].place_name
            })
        }
    })
}

module.exports = geoCode