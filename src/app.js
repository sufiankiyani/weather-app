const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require ('./utils/geocode')
const weather = require ('./utils/weather')

const app = express()

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partsPath = path.join(__dirname, '../templates/partials')

// setup handlers engine and views location
app.set('view engine' , 'hbs')
app.set('views' , viewsPath)
hbs.registerPartials(partsPath)

//setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get ('' , (req, res) => {
    res.render('index' , {
        title: 'Weather' ,
        name: 'Ali Sufian Kiyani'
    })
})


app.get ('/help' , (req, res) => {
    res.render('help' , {
        title: 'Help' ,
        msg: 'Sample Text Paragraph' ,
        name: 'Ali Sufian Kiyani'
    })
})

app.get ('/about' , (req, res) => {
    res.render('about' , {
        title: 'About Us' ,
        name: 'Ali Sufian Kiyani'
    })
})

app.get ('/weather' , (req, res) => {
    if(!req.query.loc) {
        return res.send({
            error: 'No Address Provided'
        })
    }

    geoCode (req.query.loc , (error , {latit , longt , loc} = {}) => {
        if(error) {
            return res.send({ error })
        }
    
        weather (latit, longt, (error, weatherData) => {
            if(error) {
                return res.send({ error })
            }
    
           res.send ({
               forcaste: weatherData , 
               location: loc , 
               address: req.query.loc
           })
        })
    })

    // res.send({
    //     forecate: 'forcaste' ,
    //     location: req.query.loc
    // })
})

app.get('/help/*' , (req , res) => {
    res.render('404' , {
        error: 'Help Artical Not Found' , 
        title: '404' , 
        name: 'Ali Sufian Kiyani'
    })
})

app.get('*' , (req, res) => {
    res.render('404' , {
        title: '404' , 
        error: 'Page Not Found' , 
        name: 'Ali Sufian Kiyani'
    })
})

app.listen(3000, () => {
    console.log('server is up at port 3000')
})
