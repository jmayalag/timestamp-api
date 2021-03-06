'use strict'

const express = require('express')
const morgan = require('morgan')
const moment = require('moment')

const app = express()

app.set('port', (process.env.PORT || 8080));
app.use(morgan('tiny'))
app.set('view engine', 'pug')

let parseDate = (dateString) => {
    let date = moment(dateString, 'X', true)
    if (!date.isValid())
        date = moment(dateString, 'MMMM D, YYYY')
    return date
}

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/:date', (req, res) => {
    console.log(req.params.date)
    let d = parseDate(req.params.date)

    let result = {
        unix: d.isValid() ? d.unix() : null,
        natural: d.isValid() ? d.format('MMMM D, YYYY') : null
    }

    res.json(result)
})

app.listen(app.get('port'), () => {
  console.log('Node app is running on port', app.get('port'));
});

