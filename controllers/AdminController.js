const { ObjectId } = require('mongodb');
const Admin = require('../models/Admin');
const Problems = require('../models/Problems');


module.exports = {
    async index(request,response){
        const  {email,password} = request.body;
        const user = await Admin.findOne({email,password});
        return response.json(user);

    },

    async update(request,response){
        var {id, address, birthdate, cellphone, city, email, name, uf, password} = request.body;
        const data = {
            name,
            address, 
            birthdate, 
            cellphone, 
            city, 
            email,
            password,  
            uf, 
        }

        for(var key in data) {
            if(data[key] === "") {
               delete data[key]
            }
        }
        const user = await Admin.findOneAndUpdate({_id: id}, data, {new: true});

        return response.json(user);

    },

    async store(request,response) {
        const { name, address, birthdate, cellphone, city, email, password, uf} = request.body;
        
            admin = await Admin.create({
              name, address, birthdate, cellphone, city, email, password, uf
            })
        return response.json(admin);
    },

    async searchUF(request,response){
        const uf = await Problems.find({});
        return response.json(uf);
    },

    async search(request,response) {
        const {area, type, initialData, endData, status, uf, city} = request.body;

        const data = {
            nomeProblema: type,
            areaProblema: area,
            city,
            uf,
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
            problems = await Problems.find(data).sort({areaProblema: 1});
        return response.json(problems);
    },

    async searchFilterChart(request,response) {
        const {area, type, initialData, finalData, uf, city, status} = request.body;
        const today = new Date();
        const todayString = today.toISOString();
        const todayYear = todayString.substring(0,4);
        const todayMonth = todayString.substring(5,7);
        const todayDay = todayString.substring(8,10);

        const data = {
            nomeProblema: type,
            areaProblema: area,
            initialData,
            city,
            uf,
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
        var qtdArray = [];
        problemas.map(problem => {
            areaArray.push(problem.areaProblema);
        });
        const counts = areaArray.reduce((acc, value) => ({
            ...acc,
            [value]: (acc[value] || 0) + 1
         }), {});
        
         for (var column in counts) {
            var randomColor = '#' + Math.random().toString(16).slice(2, 8).toUpperCase();
                qtdArray.push({
                    name: column, 
                    qtd: counts[column],
                    color: randomColor,
                    legendFontColor: 'black',
                    legendFontSize: 15
                });  
        }
        return response.json(qtdArray);
    },

    async searchPieChartStatus(request,response) {
        const problemas = await Problems.find({}).sort({status: 1}); 
        var typeStatus = [];
        var qtdArray = [];
        problemas.map(problem => {
            typeStatus.push(problem.status);
        });
        const counts = typeStatus.reduce((acc, value) => ({
            ...acc,
            [value]: (acc[value] || 0) + 1
         }), {});
        
         for (var column in counts) {
            var randomColor = '#' + Math.random().toString(16).slice(2, 8).toUpperCase();
                qtdArray.push({
                    name: column, 
                    qtd: counts[column],
                    color: randomColor,
                    legendFontColor: 'black',
                    legendFontSize: 15
                });  
        }
        return response.json(qtdArray);
    },



}