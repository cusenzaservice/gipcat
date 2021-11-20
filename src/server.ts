const express = require("express");
const cors = require("cors");
const config = require("./config/general.config");

const app = express();
const database = require("./models");

database.sequelize.sync().then(() => {
  console.log("Synced database models.");
});

// load cors options from module
var corsOptions = {
  origin: config.origin
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: config });
});

//load routes
require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/customer.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});