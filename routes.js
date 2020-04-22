const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');
const ProblemController = require('./controllers/ProblemController');
const SessionController = require('./controllers/SessionController');
const multer = require('multer')
const multerConfig = require('./config/multer')
const routes = Router();


const FotoSchema = require('./models/utils/Foto');


routes.post('/userscadastrados', DevController.index);
routes.post('/users', DevController.store);
routes.post('/problems', ProblemController.store);
routes.post('/deletarProblema', ProblemController.deletar);
routes.post('/pictureToServer',[multer(multerConfig).single('file')], async (req,res) => {
     const { originalname: name, size, filename: key } = req.file;
    const post = await FotoSchema.create({
        name,
        size,
        key,
        url: `C:\\Users\\Lucas\\Downloads\\tcc\\tcc\\backendtcc\\backend\\images\\${key}`
    });
    return res.json(post)
})
routes.post('/AlteraDadosUsuario', SessionController.index)
routes.get('/search', SearchController.index);
routes.get('/SearchFormBuscas', SearchController.index2);
routes.get('/searchAllProblems', SearchController.index1);
routes.get('/searchProblemsByUser', SearchController.buscaProblemasUsuario);
routes.get('/searchProblemByID', SearchController.buscaProblemaID);
routes.get('/searchUserByID', SearchController.buscaUserID);
routes.get('/searchQTDProblemsByUser', SearchController.buscaQTDProblemasUsuario);
module.exports = routes;