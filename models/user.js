const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AdminSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    views: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
    // ,
    // image: {
    //     type: String,
    //     required: true
    // }
});

const adminmodel = mongoose.model('AirBnB_Admin', AdminSchema);
module.exports = adminmodel;