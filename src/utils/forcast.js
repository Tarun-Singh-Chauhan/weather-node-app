const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=cc8e90198a9a232f0abe306711aa9d9e&query=${latitude},${longitude}`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (response.body.error) {
      callback("Unable to find location", undefined);
    } else {
      const temp = response.body.current.temperature;
      const feelLikeTemp = response.body.current.feelslike;
      callback(
        undefined,
        `${response.body.current.weather_descriptions}, It is currently ${temp} degress out and feels like ${feelLikeTemp}`
      );
    }
  });
};

module.exports = forecast;
