const express = require("express");
const https = require("https");
const { CLIENT_RENEG_LIMIT } = require("tls");

const app = express();

app.get("/", function (req, res) {
  const apiUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=amsterdam&appid=2ce2148802413615284b6746ea7e6b25&units=metric";
  https.get(apiUrl, function (response) {
    response.on("data", function (data) {
      const weatherData = JSON.parse(data);
      const temp = weatherData.list[0].main.temp;
      res.send(`The current temperature in Amsterdam is ${Math.round(temp)}°C`);
    });
  });
});

app.listen("9090", function () {
  console.log("Server is running on port 9090");
});
