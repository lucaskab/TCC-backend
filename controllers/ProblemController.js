const axios = require('axios');
const Problem = require('../models/Problems');


//index, show, store, update, destroy

module.exports = {

    async store(request,response) {
        const {email,nomeProblema, Descricao, urlFoto, areaProblema, latitude, longitude, uf, city, sugestao} = request.body;

            const posicao = {
                type : 'Point',
                coordinates: [longitude, latitude]
            }
           var problem = await Problem.create({email,nomeProblema, descricaoProblema: Descricao,sugestao, urlFoto, areaProblema, posicao, status: 'Avaliando', idPrestador: 'Em análise', uf, city}       )
        return response.json(problem);
    },

    async update(request,response){
        const  {problemId, userId} = request.body;
        await Problem.updateOne(
            {_id: problemId},
            { $set: {idPrestador: userId}}  );
        return response.json({message: 'Worked!'});

    },

    async updateStatusProblem(request,response){
        console.log("entrou")
        const  {problemId, status} = request.body;
        console.log(problemId, status)
        const problem = await Problem.updateOne(
            {_id: problemId},
            { $set: {status}}  );
            console.log(problem);
        return response.json(problem);

    },

    async deletar(request,response){
        const _id = request.body.id;

        var deletado = await Problem.deleteOne({_id});
        return response.json(deletado);
    },

    async changeIdPrestador(request,response){
        var {id} = request.body;
        console.log(id);
        const att = await Problem.findOneAndUpdate(id,{idPrestador: ''});  
        console.log(att);
        return response.json(att);
    }

}