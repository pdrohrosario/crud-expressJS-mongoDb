//JKeito 1 de criar o middleware globall
// module.exports = ( req, res, next ) => {
//     if(req.body.cliente)
//         console.log(`Nome do cliente recebido ${req.body.cliente}`);
//     next();
// }

//Jeito dois de criar 
exports.middlewareGlobal = ( req, res, next ) => {
    res.locals.variables = 'Injeção global de variaveis na rota global';
    next();
}

//segurança
exports.checkCsrfError = (err, req, res, next) => {
    if(err && err.code === 'EBADCSRFTOKEN'){
        return res.render('404');
    }
}

exports.csrfMiddleware = function(req, res, next) {
    res.locals.csrfToken = req.csrfToken();
    next();
};