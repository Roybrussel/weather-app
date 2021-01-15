const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const city = req.body.cityName;
  const apiKey = "2ce2148802413615284b6746ea7e6b25";
  const unit = "metric";

  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${unit}`;
  https.get(apiUrl, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = Math.floor(weatherData.list[0].main.temp);
      const weatherDescription = weatherData.list[0].weather[0].description;
      const icon = weatherData.list[0].weather[0].icon;
      res.write(
        `<h1>The current temperature in ${city} is ${temp} (celcius)</h1>`
      );
      res.write(`Weather description: ${weatherDescription}`);
      res.write(
        `<img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="weather-icon"/>`
      );
      res.send();

      const test = {
        name: "test",
        lastname: "test",
        middlename: "test",
      };

      console.log(test);
    });
  });
});

app.listen("9090", function () {
  console.log("Server is running on port 9090");
});
