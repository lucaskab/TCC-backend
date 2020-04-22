const mongoose = require('mongoose');


const UserRegister = new mongoose.Schema({
    nome: {
        type: String,
        require: true,
    },
    dataNascimento: { 
        type: String, 
        require: true, 
    }, 
    endereco: { 
        type: String, 
        require: true, 
    }, 
    numero: { 
        type: String, 
        require: true, 
    }, 
    cidade: { 
        type: String, 
        require: true, 
    }, 
    cep: { 
        type: String, 
        require: true, 
    }, 
    uf: { 
        type: String, 
        require: true, 
        uppercase: true, 
    }, 
    telefone: { 
        type: String, 
        require: false, 
    }, 
    celular: { 
        type: String, 
        require: true, 
    }, 
    rg: { 
        type: String,
        require: true,  
    }, 
    email: { 
        type: String, 
        require: true, 
        lowercase: true, 
    }, 
    senha: { 
        type: String, 
        require: true, 
        select: false, 
    },
    resetSenhaToken:{
        type: String,
        select: false,
    },
    resetSenhaTempo:{
        type: Date,
        select: false
    },

    CreatedAt: { 
        type: Date, 
        default: Date.now, 
    },       
});

module.exports = mongoose.model('users', UserRegister);