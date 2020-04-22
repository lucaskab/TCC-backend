const axios = require('axios');
const User = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

//index, show, store, update, destroy

module.exports = {
    async index(request,response){
        const  {email} = request.body;
    
        const usuario = await User.findOne({email});  
        return response.json(usuario);
    },

    async store(request,response) {
        const { nome, dataNascimento, endereco, numero, cidade, cep, uf, telefone, celular,
            rg, email, senha } = request.body;
        
            user = await User.create({
                nome, dataNascimento, endereco, numero, cidade, cep, uf, telefone, celular,
                rg, email, senha 
            })
        return response.json(user);
    }
}