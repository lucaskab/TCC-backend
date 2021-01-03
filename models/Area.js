const mongoose = require('mongoose');


const AreaRegister = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    CreatedAt: { 
        type: Date, 
        default: Date.now, 
    },       
});

module.exports = mongoose.model('area', AreaRegister);