exports.homePage = (req, res) => {
    res.render('index', {
        titulo:'<span style=color:yellow;">Titulo!!!!!!!!!</span>',
        numeros:[0,1,2,3,4,5,6,7,8,9,10,11,12]
    });
    return;
};

exports.homeSendInfo = ( req, res ) => {
    res.send(req.body);
};