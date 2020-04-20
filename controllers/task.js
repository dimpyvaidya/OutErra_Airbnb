// const express = require('express')
// const router = express.Router();
// const taskmodel = require("../models/task");

// router.get("/add", (req, res) => {
//     res.render("admin/addHotel");
// });

// router.post("/add", (req, res) => {
//     const newHotel = {
//         name: req.body.name,
//         description: req.body.description,
//         price: req.body.price,
//         views: req.body.views,
//         type: req.body.type
//             // ,
//             // image: req.body.image
//     }

//     /*
//           Rules for inserting into a MongoDB database USING MONGOOSE is to do the following :
//           1. YOu have to create an instance of the model, you must pass data that you want inserted
//            in the form of an object(object literal)
//           2. From the instance, you call the save method
//        */

//     const task = new taskModel(newHotel);
//     task.save()
//         .then(() => {
//             res.redirect("/task/list")
//         })
//         .catch(err => console.log(`Error happened when inserting in the database :${err}`));
// });

// router.get("/list", (req, res) => {
//     //pull from the database , get the results that was returned and then inject that results into
//     //the taskDashboard

//     taskModel.find()
//         .then((tasks) => {


//             //Filter out the information that you want from the array of documents that was returned into
//             //a new array

//             //Array 300 documents meaning that the array has 300 elements 


//             const filteredTask = tasks.map(task => {

//                 return {

//                     id: task._id,
//                     name: task.name,
//                     description: task.description,
//                     price: task.price,
//                     views: task.views,
//                     type: task.type
//                         // ,
//                         // image: req.body.image
//                 }
//             });



//             res.render("Task/taskDashboard", {
//                 data: filteredTask
//             });

//         })
//         .catch(err => console.log(`Error happened when pulling from the database :${err}`));

// })

// router.get("/description", (req, res) => {})

// router.get("/edit/:id", (req, res) => {

//     taskModel.findById(req.params.id)
//         .then((task) => {

//             const { _id, name, description, price, type, views } = task;
//             res.render("Task/taskEditForm", {
//                 _id,
//                 name,
//                 description,
//                 price,
//                 type,
//                 views
//                 // ,
//                 // image
//             })

//         })
//         .catch(err => console.log(`Error happened when pulling from the database :${err}`));
// })



// router.put("/update/:id", (req, res) => {

//     const task = {
//         name: req.body.name,
//         description: req.body.description,
//         price: req.body.price,
//         views: req.body.views,
//         type: req.body.type
//             // ,
//             // image: req.body.image
//     }

//     taskModel.updateOne({ _id: req.params.id }, task)
//         .then(() => {
//             res.redirect("/task/list");
//         })
//         .catch(err => console.log(`Error happened when updating data from the database :${err}`));


// });


// router.delete("/delete/:id", (req, res) => {

//     taskModel.deleteOne({ _id: req.params.id })
//         .then(() => {
//             res.redirect("/task/list");
//         })
//         .catch(err => console.log(`Error happened when updating data from the database :${err}`));

// });

// module.exports = router;