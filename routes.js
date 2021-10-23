const express = require('express');
const route = express.Router();
const homeCtrl = require('./src/controllers/homeCtrl');
const contatoCtrl = require('./src/controllers/contatoCtrl');

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
route.get('/',homeCtrl.homePage);
route.post('/', homeCtrl.homeSendInfo);

//Rotas de contato
route.get('/contato', contatoCtrl.homePage);

module.exports = route;