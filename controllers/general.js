const express = require('express');
const router = express.Router();

const roomModel = require("../models/rooms");
const fRoomModel = require("../models/fRooms");
const taskmodel = require("./models/task");
const adminmodel = require("./models/admin");

//This allows express to make my static content avialable from the public
router.use(express.static('static'));
router.use(bodyParser.urlencoded({ extended: false }))

router.use((req, res, next) => {
    if (req.query.method == "PUT") {
        req.method = "PUT"
    } else if (req.query.method == "DELETE") {
        req.method = "DELETE"
    }
    next();
})

router.get("/", (req, res) => {
    res.render('home', {
        title: "Home",
        headingInfo: "Home Page",
        randomContent: "Home Page"
    })
});

router.get("/home", (req, res) => {
    res.render('home', {
        title: "Home",
    });
});


router.get("/roomlisting", (req, res) => {
    res.render("roomlisting", {
        title: "Rooms Page",
        rooms: roomModel.getallRooms()
    });

});

router.get("/featuredRooms", (req, res) => {
    res.render("featuredRooms", {
        title: "Featured Rooms Page",
        fRooms: fRoomModel.getallRoomsF()
    });

});

router.post("/rooms", (req, res) => {

    //When the form is submitted
})
router.post("/fRooms", (req, res) => {

    //When the form is submitted
})

router.get("/userregistration", (req, res) => {
    res.render("userregistration", {
        title: "userregistration",
        headingInfo: "User Registration Page",
    });
});

router.get("/logout", (req, res) => {

    res.render("logout", {
        title: "Log Out",
        headingInfo: "Log Out Page",
    });
});
router.get("/dashboard", (req, res) => {

    taskmodel.find()
        .then((store) => {

            const filtertask = store.map(result => {

                return {

                    Name: result.Name,
                    Address: result.Address,
                    PostalCode: result.PostalCode,
                    phoneNo: result.phoneNo,
                    email: result.email
                }
            });
            res.render("adminedit", {
                data: filtertask
            })
        })

    .catch(err => console.log(`error in pulling database : ${err}`));
});


// router.get("/dashboard", (req, res) => {

//     res.render("dashboard", {
//         title: "User Dashboard",
//         headingInfo: "User Dashboard"
//     });
// });
router.get("/login", (req, res) => {
    res.render("login", {
        title: "Login page",
        headingInfo: "Login  Page",
    });
});

router.get("/admin", (req, res) => {

    res.render("admin", {
        title: "Admin page",
        headingInfo: "Admin  Page",
    });
});
//Registration page validation
router.get("/sendMessage", (req, res) => {
    res.render("userregistration", {
        title: "SMS Page"
    });
});


router.post("/sendMessage", (req, res) => {
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
    } else if (req.body.phoneNo.length < 10) {
        errors.push("Sorry, Your Phone Number is INVALID ");
    }
    if (req.body.email == "") {
        errors.push("Please enter your  E-mail address");
    }

    if (req.body.pswConfirm == "") {
        errors.push("Please reenter your Password");
    }
    if (req.body.psw == "") {
        errors.push("Please enter a Password");
    } else if (req.body.psw.length < 4) {
        errors.push("Sorry, you must enter a Password at least 8 characters ");
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
        //Send Message , once user registers

        const accountSid = process.env.TWILIO_AUTHID;
        const authToken = process.env.TWILIO_TOKEN;
        const client = require('twilio')(accountSid, authToken);
        const sgMail = require('@sendgrid/mail');
        sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
        const msg = {
            to: `${req.body.email}`,
            from: 'vaidyadimpy@gmail.com',
            subject: 'Sending with OutErra',
            html: `Hey ${req.body.Name}! <br><br> Thank you for registering with OutErra with ${req.body.email} email address, you will be notified with our promotional offers and  deals!!!`,
        };
        sgMail.send(msg)
            .then(() => {
                res.redirect("dashboard");
            })
            .catch((err) => {
                console.log(err);
            }),
            client.messages
            .create({
                body: `Hey ${req.body.Name}! Thank you for registering with OutErra with ${req.body.email} email address, you will be notified when any promotional offer arrives!!!`,
                from: '+12053081617',
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

//Send Email , once user registers
// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

// router.post("/userregistration", (req, res) => {
//     const sgMail = require('@sendgrid/mail');
//     sgMail.setApiKey(process.env.SEND_GRID_API_KEY);
// const msg = {
//     to: `${req.body.email}`,
//     from: 'vaidyadimpy@gmail.com',
//     subject: 'Sending with OutErra',
//     html: `Hey ${req.body.Name}! <br><br> Thank you for registering with OutErra with ${req.body.email} email address, you will be notified with our promotional offers and  deals!!!`,
// };

// sgMail.send(msg)
//     .then(() => {
//         res.redirect("/");
//     })
//     .catch(err => {
//         console.log(`Error ${err}`);
//     });

// });

//Login page validation
router.get("/sendMessageLogin", (req, res) => {
    res.render("login", {
        title: "SMS Page"
    });
});

router.post("/sendMessageLogin", (req, res) => {
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

module.exports = router;