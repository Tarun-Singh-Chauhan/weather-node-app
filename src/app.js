const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forcast");

const app = express();

app.set("view engine", "hbs");

// Absolute paths dir's
const publicDirPath = path.join(__dirname, "../public");
const viewsDirPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// view engine setup abd viewsDirPath
app.use(express.static(publicDirPath));
app.set("views", viewsDirPath);

// Partials path
hbs.registerPartials(partialsPath);

// routes
app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Tarun Chauhan",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Tarun Chauhan",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helpText: "Some helpfull text",
    title: "Help",
    name: "Tarun Chauhan",
  });
});

app.get("/weather", (req, res) => {
  const address = req.query.adress;
  if (!address) {
    return res.send({
      error: "Please provide the adress",
    });
  } else {
    geocode(address, (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error: error });
        }
        res.send([
          {
            forecaste: forecastData,
            adress: req.query.adress,
            location: location,
          },
        ]);
        // console.log(location);
        // console.log(forecastData);
      });
    });
  }
});

app.get("/products", (req, res) => {
  console.log(req.query);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.status(404).render("404", {
    status: "404",
    message: "Opps! Help Page Not Found",
  });
});

app.get("*", (req, res) => {
  res.status(404).render("404", {
    status: "404",
    message: "Page Not Found !",
  });
});

app.listen(3000, "127.0.0.1", () => {
  console.log("Server is on 3000 port");
});
