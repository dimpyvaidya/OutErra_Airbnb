const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const app = express();
app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: false }))
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
    const hotelsDB = [];
    hotelsDB.push({
        hotelId: 101,
        imageUrl: `/img/hotel1m.jpg`,
        title: "Heart Lake Hotel",
        description: "Private pool house with amazing views",
        price: 150,
        rateImageUrl: "/img/user1.png",
        feedbacker: "Darsh",
        feedback: "Highly recommended!!!",
        rating: 3
    });
    hotelsDB.push({
        hotelId: 102,
        imageUrl: `/img/hotel2m.jpg`,
        title: "Park Regis Hotel",
        description: "Romentic 1-bed with stunning views",
        price: 250,
        rateImageUrl: "/img/user2.png",
        feedbacker: "Darshu",
        feedback: "I booked the spa room and was lovely...",
        rating: 4
    });
    hotelsDB.push({
        hotelId: 103,
        imageUrl: `/img/hotel3m.jpg`,
        title: "Redissan Hotel",
        description: "Classic hotel on the Royal Mile",
        price: 303,
        rateImageUrl: "/img/user3.png",
        feedbacker: "Rekha",
        feedback: "Amazing views! The food was delicious..",
        rating: 5
    });
    hotelsDB.push({
        hotelId: 104,
        imageUrl: `/img/hotel4m.jpg`,
        title: "Anantara Hotel",
        description: "Romentic 1-bed with stunning views",
        price: 200,
        rateImageUrl: "/img/user4.png",
        feedbacker: "Dimpu",
        feedback: "Great location, nothing too much trouble",
        rating: 3
    });
    hotelsDB.push({
        hotelId: 105,
        imageUrl: `/img/hotel5m.jpg`,
        title: "Hamilton Hotel",
        description: "Classic hotel on the Royal Mile",
        price: 100,
        rateImageUrl: "/img/user5.png",
        feedbacker: "Pinku",
        feedback: "Great location, nothing too much trouble",
        rating: 5
    });
    hotelsDB.push({
        hotelId: 106,
        imageUrl: `/img/hotel7m.jpg`,
        title: "Ramada Hotel",
        description: "Private pool house with amazing views",
        price: 170,
        rateImageUrl: "/img/user6.png",
        feedbacker: "Kalpu",
        feedback: "Great location, nothing too much trouble",
        rating: 3
    });

    res.render("roomlisting", {
        title: "Room Listing",
        headingInfo: "Room Listing Page",
        hotels: hotelsDB
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

//Registration page validation
app.get("/sendMessage", (req, res) => {
    res.render("userregistration", {
        title: "SMS Page"
    });
});

app.post("/sendMessage", (req, res) => {
    const errors = [];
    if (req.body.Name == "") {
        errors.push("Please enter your Name");
    }
    if (req.body.Address == "") {
        errors.push("Please enter your Address");
    }
    if (req.body.City == "") {
        errors.push("Please enter your City");
    }
    if (req.body.State == "") {
        errors.push("Please enter your State");
    }
    if (req.body.PostalCode == "") {
        errors.push("Please enter your Postal Code");
    }
    if (req.body.phoneNo == "") {
        errors.push("Please enter your phone number");
    }
    // if (req.body.phoneNo != "/^\d{10}$/") {
    //     errors.push("Please enter your valid 10-digit Phone Number");
    // }

    if (req.body.email == "") {
        errors.push("Please enter your  E-mail address");
    }
    if (req.body.psw == "") {
        errors.push("Please enter a Password");
    }
    if (req.body.pswConfirm == "") {
        errors.push("Please reenter your Password");
    }
    if (req.body.psw.length <= 8) {
        errors.push("Please enter at least 8 digit password");
    }
    if (req.body.psw != req.body.pswConfirm) {
        errors.push("Your password and confirm password must match!");
    }
    if (req.body.uname == "") {
        errors.push("Please enter a Username");
    }
    if (errors.length > 0) {
        res.render("userregistration", {
            messages: errors
        })
    } else {
        const accountSid = 'ACb43694ef62d99d67ce028f5afcfb3db8_random';
        const authToken = '2494df27da7513651fb5309fca748196_random';
        const client = require('twilio')('ACb43694ef62d99d67ce028f5afcfb3db8_random', '2494df27da7513651fb5309fca748196_random');

        client.messages
            .create({
                body: `Hey ${req.body.Name}! Thank you for registering with OutErra with ${req.body.email} email address, you will be notified when any promotional offer arrives!!!`,
                from: '+18024733989',
                to: `${req.body.phoneNo}`
            })
            .then(message => {
                console.log(message.sid);
                res.render("home");
            })
            .catch((err) => {
                console.log(`Error ${err}`);
            })
    }
});

//Login page validation
app.get("/sendMessageLogin", (req, res) => {
    res.render("login", {
        title: "SMS Page"
    });
});

app.post("/sendMessageLogin", (req, res) => {
    const error = [];
    if (req.body.uname == "") {
        error.push("Please enter your Username");
    }
    if (req.body.psw == "") {
        error.push("Please enter your Password");
    }
    if (req.body.uname && req.body.psw != "") {
        res.render('home', {
            title: "Home",
        })

    }
    if (error.length > 0) {
        res.render("login", {
            messages: error
        })
    }
});



app.listen(3000, () => {
    console.log(`Web server is running`);
})