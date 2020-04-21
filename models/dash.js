const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");


const userSchema = new Schema({

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
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    psw: {
        type: String,
        required: true
    },
    pswConfirm: {
        type: String,
        required: true
    },

    type: {
        type: String,
        default: "User"
    }
});
userSchema.pre("save", function(next) {

    bcrypt.genSalt(10)
        .then((salt) => {
            bcrypt.hash(this.Password, salt)

            .then((encryptedPassword) => {
                this.Password = encryptedPassword;
                next();
            })
        })
        .catch(error => console.log(`Error occured while salting the password ${error}`));
})

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;