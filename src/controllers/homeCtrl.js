const Contato = require('../models/ContatoModel');

exports.index = async (req, res) => {
    
        const contatos = await Contato.buscaPorContatos();
        //injeção dos contatos buscados no index
        res.render('index', {contatos});
};
