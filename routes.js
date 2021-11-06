const express = require('express');
const route = express.Router();
const homeCtrl = require('./src/controllers/homeCtrl');
const loginCtrl = require('./src/controllers/loginCtrl');
const contatoCtrl = require('./src/controllers/contatoCtrl');
const { loginRequired } = require('./src/middleware/middleware');

// //Exemplo de middleware
// let meuMiddleWare = (req, res, next) => {
//     console.log('');
//         console.log('Passei no middleware');
//         console.log('-------------------')
//     next();
// }

// //Rotas da home
// route.get('/', meuMiddleWare,homeCtrl.homePage);

//Rota home
route.get('/',homeCtrl.index);

//Rotas de login_info
route.get('/login/index', loginCtrl.index);
route.post('/login/register', loginCtrl.register);
route.post('/login/login', loginCtrl.login);
route.get('/login/logout', loginCtrl.logout);

//Rota contatos
route.get('/contato/index', loginRequired ,contatoCtrl.index);
route.post('/contato/register', loginRequired ,contatoCtrl.register);
route.get('/contato/index/:id', loginRequired ,contatoCtrl.editIndex);
route.post('/contato/edit/:id', loginRequired ,contatoCtrl.edit);

module.exports = route;