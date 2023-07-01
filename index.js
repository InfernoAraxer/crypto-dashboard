const PORT = 5000;
const express = require('express')
const cors = require('cors')
const axios = require('axios')
require('dotenv').config()
const app = express()
app.use(express.json())
app.use(cors())

app.get('/news', async (req, res) => {
    const options = {
    method: 'GET',
    url: 'https://crypto-update-live.p.rapidapi.com/news',
    headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
        'X-RapidAPI-Host': 'crypto-update-live.p.rapidapi.com'
    }
    };
    
    axios.request(options).then((response) => {
        res.json(response.data);
    }).catch((error) => {
        console.error(error);
    })
})

app.get('/currency', async (req, res) => {
    const options = {
        method: 'GET',
        url: 'https://alpha-vantage.p.rapidapi.com/query',
        params: {
          from_currency: req.query.from_currency,
          function: 'CURRENCY_EXCHANGE_RATE',
          to_currency: req.query.to_currency
        },
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
          'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
        }
      };
      
      try {
        const response = await axios.request(options);
        res.json(response.data['Realtime Currency Exchange Rate']['5. Exchange Rate']);
      } catch (error) {
        console.error(error);
      }
})

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))