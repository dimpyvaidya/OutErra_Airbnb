const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('dotenv').config({ path: "./config/keys.env" });
const app = express();

app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: false }))
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//load controllers
const generalController = require("./controllers/general");

//map controllers
app.use("/", generalController);

mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`Connected to MongoDB Database`);
    })
    .catch(err => console.log(`Error occured while connecting to the Database ${err}`));

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Web server is running`);
})