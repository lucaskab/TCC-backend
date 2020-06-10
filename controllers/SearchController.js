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
        console.log(_id)

        const problema = await Problem.findOne({
            _id,
        })  
        return response.json(problema);
    },
    async buscaQTDProblemasUsuario(request,response){
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
        console.log(user);
        return response.json(user);
    },

    async index1(request,response){
        const problema = await Problem.find({});  
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
        console.log(problem);
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