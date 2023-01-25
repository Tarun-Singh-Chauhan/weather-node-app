const request = require("request");

const geocode = (address, callback) => {
  const url = `http://api.positionstack.com/v1/forward?access_key=1971ac8c9250bc64d947413f62393ba4&query=${address}`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (response.body.data.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    } else {
      callback(undefined, {
        latitude: response.body.data[0].latitude,
        longitude: response.body.data[0].longitude,
        location: response.body.data[0].name,
      });
    }
  });
};

module.exports = geocode;
