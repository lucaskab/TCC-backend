const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://lucaskab:djokovic@cluster-hkje6.gcp.mongodb.net/reporteja?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3333);

//Métodos HTTP: GET, POST, PUT, DELETE

//Tipos de parâmetros:

//Query params: request.query (filtros, ordenação, paginação, ...)
//Route params: request.params (identificar um recurso na alteração ou remoção)
//Body: request.body (Dados para criação ou alteração de um registro)

//MongoDB (Não-relacional)



