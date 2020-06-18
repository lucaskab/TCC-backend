const User = require('../models/Dev');


module.exports = {
    async index(request,response){
        const  {email} = request.body;
        const usuario = await User.findOne({email});
        return response.json(usuario);

    },

    async update(request,response){
        const  {idProblema, idUser} = request.body;
        await UserProblem.findOne({email});
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