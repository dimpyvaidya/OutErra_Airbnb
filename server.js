const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: false }))
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

//load controllers
const generalController = require("./controllers/general");

//map controllers
app.use("/", generalController);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Web server is running`);
})