import cors from 'cors';
import config from './config/general.config';
import database from './models';

const express = require("express");
const app = express();

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
    res.json({ message: "Online!" });
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