const mongoose = require('mongoose');


const rescuerSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    mobile_number : {
        type : Number,
        required : true
    },
    verified : {
        type : Boolean,
        default : false
    }
});

const Rescuer = mongoose.model('Rescuer', rescuerSchema);
module.exports = Rescuer;