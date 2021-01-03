const Admin = require('../models/Admin');


module.exports = {
    async index(request,response){
        const  {email,password} = request.body;
        const user = await Admin.findOne({email,password});
        return response.json(user);

    },

    async update(request,response){
        const  {idProblema, idUser} = request.body;
        await UserProblem.findOne({email});
        return response.json(usuario);

    },

    async store(request,response) {
        const { name, address, birthdate, cellphone, city, email, password, uf} = request.body;
        
            admin = await Admin.create({
              name, address, birthdate, cellphone, city, email, password, uf
            })
        return response.json(admin);
    }
}