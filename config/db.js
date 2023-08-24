// Importing Required Modules:
const mongoose = require("mongoose");
require('dotenv').config();

// Mongo Uri
const uri = process.env.MONGODB_CONNECT_STR;

const initiateMongoServer = () => {
    try {
        mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("Connected to DB !!");
    } catch (e) {
        console.log(e);
        throw e;
    }
};
module.exports = initiateMongoServer;