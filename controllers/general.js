const express = require('express');
const router = express.Router();

const roomModel = require("../models/rooms");
const userModel = require("../models/dash");
const adminModel = require("../models/adminRooms");
const bcrypt = require("bcryptjs");
const session = require('express-session');
const LoggedIn = require("../middleware/auth");
const AdminorUser = require("../middleware/authorization")

router.use(express.static('/static'));

router.get("/login", (req, res) => {

    res.render("login", {
        title: "Log In",

    });

})
router.get("/room-listing", (req, res) => {
    res.render("room-listing", {
        title: "Rooms Page",
        room: roomModel.getallRooms()
    });

});

router.get("/", (req, res) => {
    adminModel.find({ FeaturedRoom: "Yes" })

    .then((records) => {

        const rooms_data = records.map(record => {

            return {
                id: record._id,
                title: record.title,
                price: record.price,
                description: record.description,
                location: record.location,
                FeaturedRoom: record.FeaturedRoom,
                imageUrl: record.imageUrl

            }
        })

        res.render("../views/home", {
            rooms: rooms_data,
            heading: "Featured Rooms"
        });

    })

    .catch(err => console.log(`Error occured while displaying the data ${err}`))

})


router.get("/home", (req, res) => {
    adminModel.find({ FeaturedRoom: "Yes" })

    .then((records) => {

        const rooms_data = records.map(record => {

            return {
                id: record._id,
                title: record.title,
                price: record.price,
                description: record.description,
                location: record.location,
                FeaturedRoom: record.FeaturedRoom,
                imageUrl: record.imageUrl

            }
        })

        res.render("../views/home", {
            rooms: rooms_data,
            heading: "Featured Rooms"
        });

    })

    .catch(err => console.log(`Error occured while displaying the data ${err}`))

})

router.get("/userregistration", (req, res) => {
    res.render("userregistration", {
        title: "userregistration",
        headingInfo: "User Registration Page",
    });
});

router.get("/dashboard", LoggedIn, AdminorUser, (req, res) => {
    res.render("/dashboard", {
        title: "Dashboard Page",
        headingInfo: "Dashboard Page",
    });
})

// login validation
router.post("/validation", (req, res) => {

    userModel.findOne({ email: req.body.email })
        .then(user => {

            const errors = [];
            if (user == null) {
                errors.push("Sorry , your email and/or password is incorrect!");
                res.render("/login", {
                    messages: errors
                })
            } else {
                bcrypt.compare(req.body.psw, user.psw)
                    .then(isMatched => {

                        if (isMatched) {
                            req.session.userInfo = user;
                            res.redirect("/dashboard");
                        } else {
                            errors.push("Sorry , you have entered invalid credentials!");
                            res.render("../views/login", {
                                messages: errors
                            })
                        }
                    })
                    .catch((err) => console.log(err));
            }
        })
        .catch((err) => console.log(err));

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
        errors.push("Sorry, you must enter a Password at least 4 characters ");
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

        const newUser = {

            Name: req.body.Name,
            Address: req.body.Address,
            City: req.body.City,
            State: req.body.State,
            PostalCode: req.body.PostalCode,
            phoneNo: req.body.phoneNo,
            email: req.body.email,
            psw: req.body.psw
        }

        const user = new userModel(newUser);

        user.save()

        .then(() => {
            res.redirect("../views/dashboards/dashboard");
            console.log("User created in the database");
        })

        .catch(error => console.log(`Error While creating the user ${error}`))

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
                res.redirect("home");
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
                res.render("/dashboard", {
                    name: `${req.body.Name}`
                });
                // res.render("home");
            })
            .catch((err) => {
                console.log(`Error ${err}`);
            })
    }
});

//Route for Room images

router.get("/room_pic/:id", (req, res) => {

    adminModel.findById(req.params.id)
        .then((user) => {

            const { imageUrl } = user;

            res.render("../views/dashboards/AdminDash", {
                imageUrl
            })
        })

    .catch(err => console.log(`Error displaying rooms from the database ${err}`));
})

/***************** LOGOUT Route ***********/

router.get("/logout", (req, res) => {

    req.session.destroy();
    res.redirect("/login")
})


module.exports = router;