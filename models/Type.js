const mongoose = require('mongoose');


const TypeRegister = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    area: {
      type: String,
      require: true,
    },
    CreatedAt: { 
        type: Date, 
        default: Date.now, 
    },       
});

module.exports = mongoose.model('type', TypeRegister);