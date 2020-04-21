const express = require('express')
const router = express.Router();
const adminModel = require("../models/adminRooms");
const path = require("path");
const roomModel = require("../models/rooms");
const LoggedIn = require("../middleware/auth");
const AdminorUser = require("../middleware/authorization")

//This allows express to make my static content avialable from the public
router.use(express.static('static'));

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

        res.render("../views/room-listing", {
            rooms: rooms_data,
            heading: "Featured Rooms"
        });

    })

    .catch(err => console.log(`Error occured while displaying the data ${err}`))

})


router.get("/admin_dash", LoggedIn, AdminorUser, (req, res) => {
    res.render("../views/dashboards/adminDashboard")
})

router.get("/create_rooms", (req, res) => {
    res.render("../views/room_handlebars/addRoom")
})

router.post("/create_rooms", (req, res) => {

    const newRoom = {
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        location: req.body.location,
        FeaturedRoom: req.body.ftrd_rm
            // imageUrl: record.imageUrl

    };

    const user = new adminModel(newRoom);

    user.save()
        .then((user) => {
            req.files.imageUrl.name = `hotel_pic_${user._id}${path.parse(req.files.imageUrl.name).ext}`;
            req.files.imageUrl.mv(`/static/hotel_pics/${req.files.imageUrl.name}`)
                .then(() => {

                    adminModel.updateOne({ _id: user._id }, {
                        imageUrl: req.files.imageUrl.name
                    })

                    .then(() => {
                        res.redirect(`//room-listing/hotel_pic/${user._id}`);
                    })
                })
        })

    .catch(err => console.log(`An error while creating the rooms ${err}`));

});

// here is the Route to view rooms 

router.get("/view_rooms", (req, res) => {

    adminModel.find()

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

        res.render("../views/room_handlebars/viewRoom", {
            rooms: rooms_data,
        });

    })

    .catch(err => console.log(`Error occured while displaying the data ${err}`))

})

// here I used Route to edit rooms

router.get("/update_rooms/:id", LoggedIn, (req, res) => {

    adminModel.findById(req.params.id)

    .then((task) => {

        const { _id, title, price, description, location, FeaturedRoom } = task;

        res.render("../views/room_handlebars/editRoom", {

            _id,
            title,
            price,
            description,
            location,
            FeaturedRoom
        });
    })

    .catch(err => console.log(`Error occured when pulling into the database ${err}`));
})

// Route to update Rooms 

router.put("/editRoom/:id", (req, res) => {

    const task = {
        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        location: req.body.location,
        FeaturedRoom: req.body.ftrd_rm
    }

    adminModel.updateOne({ _id: req.params.id }, task)

    .then(() => {
        res.redirect("/room-listing/view_rooms")
    })

    .catch(err => console.log(`Error occured when pulling into the database ${err}`));

})

// Route to delete rooms

router.delete("/delete/:id", LoggedIn, (req, res) => {

    adminModel.deleteOne({ _id: req.params.id })

    .then(() => {
        res.redirect("/room-listing/view_rooms");
    })

    .catch(err => console.log(`Error occured while deleting the record ${err}`));

})




router.get('/room_pic/:id', (req, res) => {

    adminModel.findById(req.params.id)
        .then((user) => {

            const { imageUrl } = user;

            res.render("room_handlebars/viewRooms", {

                imageUrl
            });
        })

    .catch(err => { console.log("error occured when loading the image") })
})

module.exports = router;