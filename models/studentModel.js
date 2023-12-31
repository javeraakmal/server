const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minLength: [3, "Name should be proper"]
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    address: {
        type: String,
        required: [true, "address is required"]
    },
    about: {
        type: String,
        required: [true, "about is required"]
        
    },
    image: {
        type: String,
        required: [true, "image is required"],
        get: linkUrl
    }
}, {toJSON: {getters: true} } )

function linkUrl(image) {
    return "http://localhost:3003/" + image;
}

const StudentModel = mongoose.model('Student', studentSchema);
module.exports = StudentModel;