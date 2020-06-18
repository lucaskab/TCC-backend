const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');




const Problem = new mongoose.Schema({
    email:  String,
    nomeProblema: String,
    areaProblema: String,
    descricaoProblema:  String,
    sugestao:  String,
    status: String,
    idPrestador: String,
    urlFoto: [String],
    posicao: {
        type:PointSchema,
        index: '2dsphere'
    },
    CreatedAt: { 
        type: Date, 
        default: Date.now, 
    },       
});

module.exports = mongoose.model('problem', Problem);