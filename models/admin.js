const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AdminSchema = new Schema({

    title: {
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
    image: {
        type: String,
        required: true
    }
});

const adminmodel = mongoose.model('OutErra_Admin', AdminSchema);
module.exports = adminmodel;