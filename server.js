const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');

require('dotenv').config({ path: "./config/keys.env" });
const app = express();

app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: false }))
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//load controllers
const generalController = require("./controllers/general");
const taskController = require("./controllers/task");


/*
    This is to allow specific forms and/or links that were submitted/pressed
    to send PUT and DELETE request respectively!!!!!!!
*/
app.use((req, res, next) => {

    if (req.query.method == "PUT") {
        req.method = "PUT"
    } else if (req.query.method == "DELETE") {
        req.method = "DELETE"
    }

    next();
})

app.use(fileUpload());

//map controllers
app.use("/", generalController);
// app.use("/admin", adminRoutes);

// app.use("/", (req, res) => {
//     res.render("general/404");
// });

mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`Connected to MongoDB Database`);
    })
    .catch(err => console.log(`Error occured while connecting to the Database ${err}`));

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Web server is running`);
})