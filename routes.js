const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');
const ProblemController = require('./controllers/ProblemController');
const SessionController = require('./controllers/SessionController');
const AdminController = require('./controllers/AdminController');
const AreaController = require('./controllers/AreaController');
const TypeController = require('./controllers/TypeController');
const multer = require('multer')
const multerConfig = require('./config/multer')
const routes = Router();


const FotoSchema = require('./models/utils/Foto');
const Area = require('./models/Area');


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
});
routes.get('/searchFilterBetweenDates', SearchController.filterBetweenDates);
routes.get('/searchFilterProvider', SearchController.filter);
routes.post('/changeProblemStatus', ProblemController.updateStatusProblem);
routes.post('/changeIdPrestador', ProblemController.changeIdPrestador);
routes.post('/AlteraDadosUsuario', SessionController.index);
routes.post('/AtribuirProblema', ProblemController.update);
routes.get('/search', SearchController.index);
routes.get('/SearchFormBuscas', SearchController.index2);
routes.get('/searchAllProblems', SearchController.index1);
routes.get('/searchProblemsFromProvider', SearchController.buscaProblemasPrestador);
routes.get('/searchProblemsByUser', SearchController.buscaProblemasUsuario);
routes.get('/searchProblemByID', SearchController.buscaProblemaID);
routes.get('/searchUserByID', SearchController.buscaUserID);
routes.get('/searchQTDProblemsByUser1', SearchController.buscaQTDProblemasUser);
routes.get('/searchQTDProblemsByUser', SearchController.buscaQTDProblemasUsuario);


//Admin Routes
routes.post('/admin', AdminController.store);
routes.post('/sessions', AdminController.index);
routes.post('/searchProblemsAdmin', AdminController.search);
routes.post('/searchFilterChartAdmin', AdminController.searchFilterChart);
routes.get('/searchPieChartData', AdminController.searchPieChartArea);

//Area Routes
routes.post('/addArea', AreaController.store);
routes.post('/attArea', AreaController.update);
routes.post('/deleteArea', AreaController.delete);
routes.post('/findAllAreas', AreaController.findAll);

//Type Routes
routes.post('/addType', TypeController.store);
routes.post('/attType', TypeController.update);
routes.post('/deleteType', TypeController.delete);
routes.post('/findAllTypes', TypeController.findAll);

module.exports = routes;