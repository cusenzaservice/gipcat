const express = require("express");
const cors = require("cors");
const corsConfig = require("./config/cors.config");
const dbConfig = require("./config/db.config");

const app = express();
const db = require("./models");

if(dbConfig.resync){
  db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
  });
}else{
  db.sequelize.sync().then(() => {
    console.log("Synced database models.");
  });
}

// load cors options from module
var corsOptions = {
  origin: corsConfig.origin
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: corsConfig });
});

//load routes
require("./routes/tutorial.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});