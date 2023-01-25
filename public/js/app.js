const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const address = document.querySelector("#location");
const forecastDescripition = document.querySelector("#forecast");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  forecastDescripition.innerHTML = "Loading...";
  address.innerHTML = "";

  fetch(`https://node-weather.netlify.app/weather?adress=${search.value}`).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          address.innerHTML = "";
          forecastDescripition.innerHTML = data.error;
        } else {
          address.innerHTML = "Location : " + data[0].adress;
          forecastDescripition.innerHTML = "Forecast : " + data[0].forecaste;
          search.value = "";
          //   console.log(data[0].location);
          //   console.log(data[0].forecaste);
        }
      });
    }
  );
});
