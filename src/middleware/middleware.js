//Jeito dois de criar 
exports.middlewareGlobal = function( req, res, next ){
    res.locals.errors = req.flash('errors');
    next();
}

//segurança
exports.checkCsrfError = function(err, req, res, next){
    if(err){
        return res.render('404');
    }

    next();
}

exports.csrfMiddleware = function(req, res, next) {
    res.locals.csrfToken = req.csrfToken();
    res.locals.errors = req.flash('errors');
    res.locals.success = req.flash('success');
    res.locals.user = req.session.user;

    next();
};