const User = require('../models/Dev');

module.exports ={

    async index(request,response){
        var {id,nome,dataNascimento,endereco, numero, cidade, cep, 
            uf, telefone, celular, rg, email,} = request.body;
            console.log(request.body);
        const att = await User.findOneAndUpdate(id,{nome,  
            dataNascimento, 
            endereco,  
            numero, 
            cidade, 
            cep, 
            uf, 
            telefone, 
            celular, 
            rg, 
            email, });  

        return response.json(att);
    }
};