const mongoose = require('mongoose');


const AdminRegister = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    birthdate: { 
        type: String, 
        require: true, 
    }, 
    address: { 
        type: String, 
        require: true, 
    }, 
    city: { 
        type: String, 
        require: true, 
    }, 
    uf: { 
        type: String, 
        require: true, 
        uppercase: true, 
    },  
    cellphone: { 
        type: String, 
        require: true, 
    }, 
    email: { 
        type: String, 
        require: true, 
        lowercase: true, 
    }, 
    password: { 
        type: String, 
        require: true, 
        select: false, 
    },
    CreatedAt: { 
        type: Date, 
        default: Date.now, 
    },       
});

module.exports = mongoose.model('admin', AdminRegister);