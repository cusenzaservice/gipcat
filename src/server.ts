import cors from 'cors';
import { placeholder } from 'sequelize/types/lib/operators';
import config from './config/general.config';
import database from './models';

const express = require("express");
const app = express();

var pjson = require('../package.json');
console.log(pjson.version)

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
app.get(config.apiBasePath + "/", (req, res) => {
    res.json(
        { 
            version: pjson.version,
            apiBasePath: config.apiBasePath,
            origin: config.origin,
            defaultSessionExpiry: config.sessionExpiry
        }
    );
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