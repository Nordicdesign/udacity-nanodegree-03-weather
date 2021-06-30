const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const fetch = require("node-fetch");

let app = express();

app.use(express.static('website'));
app.use(cors());
app.use(bodyParser.json())

dotenv.config();

// storage init
let projectData = {};

const getWeatherData = async (zip) => {
  const url = 'https://api.openweathermap.org/data/2.5/weather?zip=';
  const weatherKey = process.env.OPEN_WEATHER;
  const result = await fetch(url+zip+",us&units=metric&APPID="+weatherKey);
  try {
    const weatherData = await result.json();
    return weatherData;
  }
  catch(error) {
    console.log(error);
    if (!error.response) {
      // network error
      return {
        code: 404,
        msg: "404, can't be found"
      }
    }
    else {
      return {
        code: 400,
        msg: 'something broke'
      }
    }
  }
}

app.get('/weather/:zip', async function(req, res) {
  const zip = req.params.zip;
  const weatherData = await getWeatherData(zip);
  res.send(weatherData);
});

app.get('/all', async function(req, res) {
  res.send(projectData);
});

// Create a server to listen at port 8080
let server = app.listen(8080, function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log("REST API app listening at http://%s:%s", host, port);
})
