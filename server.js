const express = require("express");
const exphbs = require('express-handlebars');
const app = express();
app.use(express.static('static'));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get("/", (req, res) => {

    res.render('home', {
        title: "Home",
        headingInfo: "Home Page",
        randomContent: "Home Page"
    })
});

app.get("/home", (req, res) => {
    res.render('home', {
        title: "Home",
    })
})

app.get("/roomlisting", (req, res) => {
    res.render("roomlisting", {
        title: "Room Listing",
        headingInfo: "Room Listing Page",
    });
});

app.get("/userregistration", (req, res) => {
    res.render("userregistration", {
        title: "userregistration",
        headingInfo: "User Registration Page",
    });
});

app.get("/login", (req, res) => {
    res.render("login", {
        title: "Login page",
        headingInfo: "Login  Page",
    });
});

app.post("/sendMessage", (req, res) => {
    const errors = [];
    if (req.body.Name == "") {
        errors.push("Sorry, you must enter a Name");
    }
    if (req.body.Address == "") {
        errors.push("Sorry, you must enter an Address");
    }
    if (req.body.PostalCode == "") {
        errors.push("Sorry, you must enter a Postal Code");
    }
    if (req.body.City == "") {
        errors.push("Sorry, you must enter a City");
    }
    if (req.body.State == "") {
        errors.push("Sorry, you must enter a State");
    }
    if (req.body.phoneNo == "") {
        errors.push("Sorry, you must enter a phone number");
    }
    if (req.body.email == "") {
        errors.push("Sorry, you must enter an  E-mail")
    }
    if (req.body.psw == "") {
        errors.push("Sorry, you must enter a  Password")
    }
    if (errors.length > 0) {
        res.render("form", {
            messages: errors
        })
    }
});

app.listen(3000, () => {
    console.log(`Web server is running`);
})