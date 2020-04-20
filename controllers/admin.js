// const express = require('express')
// const router = express.Router();
// const adminmodel = require("../models/admin");
// const path = require("path");

// router.get("/add", (req, res) => {
//     res.render("/admin/addHotel");
// });

// router.post("/add", (req, res) => {
//     const newHotel = {
//         name: req.body.name,
//         description: req.body.description,
//         price: req.body.price,
//         location: req.body.location,
//         type: req.body.type,
//         image: req.body.image
//     }
//     const task = new adminmodel(newHotel);
//     task.save()
//         .then(() => {
//             res.redirect("/admin/list");
//         })
//         .catch(err => console.log(`Error occured while inserting into the database : ${err}`))
// });

// router.get("/list", (req, res) => {

//     res.render("/admin/hotelDashboard");
// });

// router.post("/add", (req, res) => {

// });