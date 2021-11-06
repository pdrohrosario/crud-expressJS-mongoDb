const mongoose = require('mongoose');
const validator = require('validator');
const ContatoSchema = new mongoose.Schema({
    nome:{type:String, required:true},
    sobrenome:{type:String, required:false, default:''},
    email:{type:String, required:false, default:''},
    telefone:{type:String, required:false, default:''},
    criadoEm:{type:Date, default:Date.now()},
});

const ContatoModel = new mongoose.model('Contato',ContatoSchema);

function Contato(body) {
    this.body = body;
    this.errors = [];
    this.contato = null;
}

Contato.prototype.register = async function(){
    this.validate();

    if(this.errors.length > 0){
        return;
    }

    this.contato = await ContatoModel.create(this.body);
}

Contato.buscaPorId = async function(id){
    if(typeof id !== "string"){
        return;
    }
    const user = await ContatoModel.findById(id);
    return user;
}

Contato.prototype.edit = async function(id) {
    if(typeof id !== "string"){
        return;
    }
    this.validate();
    if(this.errors.length > 0){
        return;
    }
    this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, {new: true});
}

Contato.prototype.validate = function(){


    //Validate email e password;
    this.cleanUp();

    if(this.body. email && !validator.isEmail(this.body.email)){
        this.errors.push('Email inválido');
    }

    if(!this.body.nome){
         this.errors.push('Nome é obrigatório para o registro do contato.');
    }

    if(!this.body.email && !this.body.telefone){
        this.errors.push("Para cadastrar o contato é necessário a informação de email ou telefone do contato.");
    }
}   

Contato.prototype.cleanUp = function(){
    for(const key in this.body){
      if(typeof this.body[key] !== 'string'){
        this.body[key] = '';
      }
    }

    this.body = {
       nome: this.body.nome,
       sobrenome: this.body.sobrenome, 
       email: this.body.email,
       telefone: this.body.telefone
    };
} 

module.exports = Contato;