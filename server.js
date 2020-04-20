const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const roomModel = require("../models/rooms");
const fRoomModel = require("../models/fRooms");
const taskmodel = require("./models/task");
const adminmodel = require("./models/user");
const fileUpload = require('express-fileupload');
const session = require('express-session');
const bcrypt = require("bcryptjs");
const authentication = require("./middleware/auth");
const dashboardLoader = require("./middleware/authorazation");

require('dotenv').config({ path: "./config/keys.env" });
const app = express();

const mongoose = require('mongoose');
mongoose.connect(process.env.mongo_db_connection_string, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("connect to moongoose databade");
    }).catch(err => console.log(`error in database : ${err}`));


//autorization//
app.set('trust proxy', 1)
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,

}))


app.use(express.static('static'));
app.use(bodyParser.urlencoded({ extended: false }))
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

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
        products: fRoomModel.getallRoomsF()

    });
});


router.get("/roomlisting", (req, res) => {
    res.render("roomlisting", {
        title: "Rooms Page",
        rooms: roomModel.getallRooms()
    });

});

// router.get("/featuredRooms", (req, res) => {
//     res.render("featuredRooms", {
//         title: "Featured Rooms Page",
//         fRooms: fRoomModel.getallRoomsF()
//     });

// });

// router.post("/rooms", (req, res) => {

//     //When the form is submitted
// })
// router.post("/fRooms", (req, res) => {

//     //When the form is submitted
// })

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

router.get("/profilepage", (req, res) => {

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
            res.render("profilepage", {
                data: filtertask
            })
        })

    .catch(err => console.log(`error in pulling database : ${err}`));
});


router.get("/login", (req, res) => {
    res.render("login", {
        title: "Login page",
        headingInfo: "Login  Page",
    });
});

router.get("/admin", (req, res) => {

    res.render("admin/addHotel", {
        title: "Admin page",
        headingInfo: "Admin  Page",
    });
});

router.get("/updateadmin", (req, res) => {

    res.render("updateadmin", {
        title: "Admin Update page",
        headingInfo: "Admin Update Page",
    });
});

router.get("/SenddataAdmin", (req, res) => {
    res.render("admin", {
        title: "Admin page",
        headingInfo: "Admin Page",
    });
});

router.post("/SenddataAdmin", (req, res) => {

    const newuseradmin = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.Price,
        views: req.body.views,
        type: req.body.type,
        image: req.body.image,
    }
    const taskadmin = new adminmodel(newuseradmin);
    taskadmin.save()
        .then(() => {
            console.log("Admin Created ")
            res.redirect("adminedit");
        })
        .catch(err => console.log(`error in pulling database : ${err}`));
});


app.get("/adminedit", (req, res) => {

    adminmodel.find()
        .then((store) => {

            const filtertask = store.map(result => {

                return {
                    id: result._id,
                    title: result.title,
                    description: result.description,
                    Price: result.Price,
                    priority: result.priority,
                    status: result.status

                }
            });
            res.render("adminedit", {
                admindata: filtertask
            })
        })

    .catch(err => console.log(`error in pulling database : ${err}`));
});
app.get("/welcome", authentication, dashboardLoader);


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

    }
    const newuser = {
        Name: req.body.Name,
        Address: req.body.Address,
        PostalCode: req.body.PostalCode,
        phoneNo: req.body.phoneNo,
        City: req.body.City,
        State: req.body.State,
        psw: req.body.psw,
        email: req.body.email

    }
    const task = new taskmodel(newuser);
    task.save()
        .then(() => {
            res.redirect("profilepage");
        })
        .catch(err => console.log(`error in pulling database : ${err}`));
});

app.post("/sendLogin", (req, res) => {
    taskmodel.findOne({ email: req.body.email })
        .then(user => {

            const errors = [];

            //email not found
            if (user == null && errors.length > 0) {
                errors.push("Sorry, your email and/or password incorrect");
                res.render("login", {
                    errors
                })

            }

            //email is found
            else {
                bcrypt.compare(req.body.psw, user.psw)
                    .then(isMatched => {

                        if (isMatched) {
                            //cretae our sessoin
                            req.session.userInfo = user;

                            res.redirect("welcome");
                        } else {
                            errors.push("Sorry, your email and/or password incorrect ");
                            res.render("login", {
                                errors
                            })
                        }

                    })
                    .catch(err => console.log(`Error ${err}`));
            }


        })

    .catch(err => console.log(`Error ${err}`));
});
app.use((req, res, next) => {

    res.user = req.session.userInfo;
    next();
})


// //Login page validation
// router.get("/sendMessageLogin", (req, res) => {
//     res.render("login", {
//         title: "SMS Page"
//     });
// });

// router.post("/sendMessageLogin", (req, res) => {
//     const error = [];
//     if (req.body.uname == "") {
//         error.push("Please enter your Username");
//     }
//     if (req.body.psw == "") {
//         error.push("Please enter your Password");
//     }
//     if (req.body.uname && req.body.psw != "") {
//         res.render('home', {
//             title: "Home",
//         })

//     }
//     if (error.length > 0) {
//         res.render("login", {
//             messages: error
//         })
//     }
// });

module.exports = router;

//update and delete//
app.use((req, res, next) => {

    if (req.query.method == "PUT") {
        req.method = "PUT"
    } else if (req.query.method == "DELETE") {
        req.method = "DELETE"
    }
    next();
})


app.get("/edit/:id", (req, res) => {

    adminmodel.findById(req.params.id)
        .then((task) => {
            const { _id, title, description, Price, priority, status } = task;
            res.render("updateadmin", {
                _id,
                title,
                description,
                Price,
                priority,
                status
            });
        })
        .catch(err => console.log(`error in pulling database : ${err}`));
});

app.put("/update/:id", (req, res) => {

    const newuseradmin = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        views: req.body.views,
        type: req.body.type,
        image: req.body.image,
    }
    adminmodel.updateOne({ _id: req.params.id }, newuseradmin)
        .then(() => {
            res.redirect("/adminedit");
        })
        .catch(err => console.log(`error in update database : ${err}`));
});
app.delete("/delete/:id", (req, res) => {
    adminmodel.deleteOne({ _id: req.params.id })
        .then(() => {
            res.redirect("/adminedit");
        })
        .catch(err => console.log(`error in delete database : ${err}`));
});



// app.use(fileUpload());

//map controllers
// app.use("/", generalController);
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