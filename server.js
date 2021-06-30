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


const getWeatherData = async (zip) => {
  const url = 'https://api.openweathermap.org/data/2.5/weather?zip=';
  const weatherKey = process.env.OPEN_WEATHER;
  const result = await fetch(url+zip+",us&APPID="+weatherKey);
  try {
    console.log("the fetch result", result);
    const weatherData = await result.json();
    console.log(weatherData);
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


// Create a server to listen at port 8080
let server = app.listen(8080, function () {
  let host = server.address().address;
  let port = server.address().port;
  console.log("REST API app listening at http://%s:%s", host, port);
})
