const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
// const roomModel = require("./models/rooms");
// const fRoomModel = require("./models/fRooms");
// const taskmodel = require("./models/task");
// const adminmodel = require("./models/user");
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const session = require('express-session');

require('dotenv').config({ path: "./config/keys.env" });
const app = express();
app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: false }))
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


app.use(fileUpload());

// Load the controllers 
const generalController = require("./controllers/general")
const roomsController = require("./controllers/room");

//map controllers
app.use("/", generalController);
app.use("/room-listing", roomsController);

//update and delete//
app.use((req, res, next) => {

    if (req.query.method == "PUT") {
        req.method = "PUT"
    } else if (req.query.method == "DELETE") {
        req.method = "DELETE"
    }
    next();
})

app.use(session({
    secret: `${process.env.SECRET_KEY}`,
    resave: false,
    saveUninitialized: true
}))

app.use((req, res, next) => {

    res.locals.user = req.session.userInfo;
    next();
})


//db conn
mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`Connected to MongoDB Database`);
    })
    .catch(err => console.log(`Error occured while connecting to the Database ${err}`));

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Web server is running`);
})