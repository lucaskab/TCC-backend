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

    async searchFilterChart(request,response) {
        const {area, type, initialData, finalData, status} = request.body;
        const today = new Date();
        const todayString = today.toISOString();
        const todayYear = todayString.substring(0,4);
        const todayMonth = todayString.substring(5,7);
        const todayDay = todayString.substring(8,10);

        const data = {
            nomeProblema: type,
            areaProblema: area,
            initialData,
            finalData,
            status,
        }

        for(var key in data) {
            if(data[key] === "") {
               delete data[key]
            }
        }

        if(initialData && finalData) {
            
            if(finalData === todayYear) {
                data.CreatedAt = {
                $gte: `${initialData}-01-01T00:00:00.000Z`,
                $lt: `${todayYear}-${todayMonth}-${todayDay}T23:59:59.999Z`
                }
            } else {
                data.CreatedAt = {
                    $gte: `${initialData}-01-01T00:00:00.000Z`,
                    $lt: `${finalData}-12-31T23:59:59.999Z`
                }
            }
            
            delete data.initialData;
            delete data.finalData;

        } else if(initialData) {
            if(initialData === todayYear) {
                data.CreatedAt = {
                $gte: `${initialData}-01-01T00:00:00.000Z`,
                $lt: `${todayYear}-${todayMonth}-${todayDay}T23:59:59.999Z`
                }
            } else {
                data.CreatedAt = {
                    $gte: `${initialData}-01-01T00:00:00.000Z`,
                    $lt: `${initialData}-12-31T23:59:59.999Z`
                }
            } 

            delete data.initialData;
        }
            problems = await Problems.find(data).sort({areaProblema: 1});
        return response.json(problems);
    },

    async searchPieChartArea(request,response) {
        const problemas = await Problems.find({}).sort({areaProblema: 1}); 

        var areaArray = [];
        var finalArray = [];
        var qtdArray = [];
        var area = areaArray[0];;
        var qtdArea = 0;

        problemas.map(problem => {
            areaArray.push(problem.areaProblema);
        });

        for(var i=0; i<areaArray.length; i++) {
            if(area !== areaArray[i]){
                var randomColor = '#' + Math.random().toString(16).slice(2, 8).toUpperCase();
                    finalArray.push({
                        name: area, 
                        qtd: qtdArea,
                        color: randomColor,
                        legendFontColor: 'black',
                        legendFontSize: 15
                    });
                    qtdArray.push(qtdArea); 
                    area = areaArray[i];
                    qtdArea = 0;
            }
            qtdArea += 1;
        }
        finalArray.shift();
        return response.json(finalArray);
    },



}