const Problem = require('../models/Problems');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports ={

    async buscaProblemasUsuario(request,response){
        const {email} = request.query;

        const problema = await Problem.find({
            email,
        }).sort({nomeProblema: 1});  
        return response.json(problema);
    },
    async buscaProblemaID(request,response){
        const {_id} = request.query;

        const problema = await Problem.findOne({
            _id,
        })  
        return response.json(problema);
    },
    async buscaQTDProblemasUsuario(request,response){
        const {idPrestador} = request.query;
        const qtd = await Problem.find({
            idPrestador
        }).countDocuments({});  
        return response.json(qtd);
    },
    async buscaQTDProblemasUser(request,response){
        const {email} = request.query;
        const qtd = await Problem.find({
            email
        }).countDocuments({});  
        return response.json(qtd);
    },
    async buscaUserID(request,response){
        const {_id} = request.query;

        const user = await Dev.findOne({
            _id,
        })  
        return response.json(user);
    },
    async filter(request,response){
        var {areaProblema, nomeProblema,dataInicio, dataFinal, status} = request.query;
        var arrayData = [{areaProblema}, {nomeProblema}, {dataInicio}, {dataFinal}, {status}];

        function filter(obj) {
            if ('status' in obj && obj.status != '') {
              return true;
            } 

            if ('areaProblema' in obj && obj.areaProblema != '' ) {
                return true;
              } 
              if ('nomeProblema' in obj && obj.nomeProblema != '' ) {
                return true;
              }
              if ('dataInicio' in obj && obj.dataInicio != '') {
                return true;
              }  
              if ('dataFinal' in obj && obj.dataFinal != '') {
                return true;
              }   
            
            else {
              return false;
            }
          }

          var arrFiltered = arrayData.filter(filter);
          var data;
          for(i=0; i< arrFiltered.length; i++){
              if('status' in arrFiltered[i]){
                status = arrFiltered[i].status;
                data = {...data, status }
              }
              if('areaProblema' in arrFiltered[i]){
                areaProblema = arrFiltered[i].areaProblema;
                data = {...data, areaProblema }
              }
              if('dataInicio' in arrFiltered[i]){
                dataInicio = arrFiltered[i].dataInicio;
                data = {...data, dataInicio }
              }
              if('dataFinal' in arrFiltered[i]){
                dataFinal = arrFiltered[i].dataFinal;
                data = {...data, dataFinal }
              }
              if('nomeProblema' in arrFiltered[i]){
                nomeProblema = arrFiltered[i].nomeProblema;
                data = {...data, nomeProblema }
              }
              
          }
       const retorno = await Problem.find(data)
        return response.json(retorno);
    },

    async filterBetweenDates(request,response){
        const {dataInicio, dataFinal, nomeProblema} = request.query;

        const problems = await Problem.find({"CreatedAt":{ $gte:dataInicio, $lt:dataFinal }}).countDocuments();

        return response.json(problems);
    },

    async buscaProblemasPrestador(request,response){
        const {idPrestador} = request.query;

        const problems = await Problem.find({
            idPrestador,
        })  
        return response.json(problems);
    },

    async index1(request,response){
        const problema = await Problem.find({}).sort({areaProblema: 1});  
        return response.json(problema);
    },

    async index(request,response) {
        //Buscar todos Devs num raio 10km
        //Filtrar por tecnologias
        const { latitude, longitude, areaProblema } = request.query;

        
        const problem = await Problem.find({
            areaProblema,
            posicao: {
               $near: {
                   $geometry:{
                    type: 'Point',
                    coordinates: [longitude, latitude],
                   },
                   $maxDistance: 10000
               },
            },
           
        });
        return response.json({problem});
    },

    async index2(request,response) {
        var problem = {};
        const { latitude, longitude, kmBusca, nomeProblema, areaProblema} = request.query;

       if(areaProblema === '' && nomeProblema === ''){
        problem = await Problem.find({
            posicao: {
              $near: {
                  $geometry:{
                   type: 'Point',
                   coordinates: [longitude, latitude],
                  },
                  $maxDistance: kmBusca
              },
           },
          
       });
   }

   else if(areaProblema !== '' && nomeProblema!== ''){
    problem = await Problem.find({
       nomeProblema,
       areaProblema,
       posicao: {
          $near: {
              $geometry:{
               type: 'Point',
               coordinates: [longitude, latitude],
              },
              $maxDistance: kmBusca
          },
       },
      
   });
}
       
      else if(nomeProblema === '' && areaProblema !== ''){
         problem = await Problem.find({
            areaProblema,
            posicao: {
               $near: {
                   $geometry:{
                    type: 'Point',
                    coordinates: [longitude, latitude],
                   },
                   $maxDistance: kmBusca
               },
            },
           
        });
    }
    else if(areaProblema === '' && nomeProblema !== ''){
         problem = await Problem.find({
            nomeProblema,
            posicao: {
               $near: {
                   $geometry:{
                    type: 'Point',
                    coordinates: [longitude, latitude],
                   },
                   $maxDistance: kmBusca
               },
            },
           
        });
    }

        return response.json(problem);
    }

}