const express = require('express');
const route = express.Router();
const homeCtrl = require('./src/controllers/homeCtrl');
const loginCtrl = require('./src/controllers/loginCtrl');

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

//Rotas de log_info
route.get('/login/index', loginCtrl.index);
route.post('/login/register', loginCtrl.register);
route.post('/login/login', loginCtrl.login);

module.exports = route;