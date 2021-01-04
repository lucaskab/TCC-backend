const Admin = require('../models/Admin');
const Problems = require('../models/Problems');


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
    },

    async search(request,response) {
        const {area, type, initialData, endData, status} = request.body;

        const data = {
            nomeProblema: type,
            areaProblema: area,
            initialData,
            endData,
            status,
        }

        for(var key in data) {
            if(data[key] === "") {
               delete data[key]
            }
        }
            if(initialData && endData) {
                var initialYear = initialData.substring(6,10);
                var initialMonth = initialData.substring(3,5);
                var initialDay = initialData.substring(0,2);

                var endYear = endData.substring(6,10);
                var endMonth = endData.substring(3,5);
                var endDay = endData.substring(0,2);

                data.CreatedAt = {
                    $gte: `${initialYear}-${initialMonth}-${initialDay}T00:00:00.000Z`,
                    $lt: `${endYear}-${endMonth}-${endDay}T23:59:59.999Z`
                }
                delete data.initialData;
                delete data.endData;
            }
            problems = await Problems.find(data);
        return response.json(problems);
    },


}