const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// here is the schema for room listing. 
const roomSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    location: {
        type: String,
        require: true
    },
    FeaturedRoom: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        require: false
    }

});

const adminModel = mongoose.model('Admin Room', roomSchema);
module.exports = adminModel;