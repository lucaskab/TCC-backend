const axios = require('axios');
const Problem = require('../models/Problems');


//index, show, store, update, destroy

module.exports = {

    async store(request,response) {
        const {email,nomeProblema, Descricao, urlFoto, areaProblema, latitude, longitude, sugestao} = request.body;

            const posicao = {
                type : 'Point',
                coordinates: [longitude, latitude]
            }
           var problem = await Problem.create({email,nomeProblema, descricaoProblema: Descricao,sugestao, urlFoto, areaProblema, posicao, status: 'Avaliando'}       )
        return response.json(problem);
    },

    async deletar(request,response){
        const _id = request.body.id;

        var deletado = await Problem.deleteOne({_id});
        return response.json(deletado);
    }
}