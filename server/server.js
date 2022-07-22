require('dotenv').config()
const express = require('express')
const fetch = require('node-fetch')

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const cors = require('cors');
app.use(cors());

const getNCHCData = async (req, res) => {
  try {
    const apiPath = 'https://covid-19.nchc.org.tw/api/covid19?CK=covid-19@nchc.org.tw'
    const querydata = req.query.querydata
    const limited = req.query.limited
    let url
    if (limited){
      url = `${apiPath}&querydata=${querydata}&limited=${limited}`
    } else {
      url = `${apiPath}&querydata=${querydata}`
    }
    const raw = await fetch(url)
    const data = await raw.json()

    // for some specific apis, only send data that is up-to-date
    let trimmedData
    if (querydata === '4001'){
      trimmedData = data.slice(0, 10)
    } else if (querydata === '5002'){
      trimmedData = data.slice(0, 800)
    }

    res.json({
      success: true,
      results: trimmedData || data,
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'server error',
    });
  }
}
const getJHUCSSEData = async (req, res) => {
  try {
    const apiPath = 'https://api.covid19api.com/'
    const q = req.query.q
    const raw = await fetch(`${apiPath}${q}`)
    const data = await raw.json()

    res.json({
      success: true,
      results: data,
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: 'server error',
    });
  }
}

app.get('/', (req, res) => res.send('home!'))
app.get('/api/nchc', getNCHCData)
app.get('/api/jhucsse', getJHUCSSEData)

app.listen(process.env.PORT || 3000)