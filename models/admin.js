const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const adminSchema = new Schema({

    Name: {
        type: String,
        required: true
    },
    Address: {
        type: String,
        required: true
    },
    City: {
        type: String,
        required: true
    },
    State: {
        type: String,
        required: true
    },
    PostalCode: {
        type: String,
        required: true
    },
    phoneNo: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    psw: {
        type: String,
        required: true
    }

});
adminSchema.pre("save", function(next) {
    bcrypt.genSalt(10)
        .then((salt) => {
            bcrypt.hash(this.psw, salt)
                .then((encryptpsw) => {
                    this.psw = encryptpsw;
                    next();
                })
                .catch(err => console.log(`error in encrypt password from hashing database : ${err}`));
        })
        .catch(err => console.log(`error in encrypt password from database : ${err}`));



})
const adminModel = mongoose.model('Admin', adminSchema);
module.exports = adminModel;