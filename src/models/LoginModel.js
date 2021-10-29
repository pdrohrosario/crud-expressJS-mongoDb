const mongoose = require('mongoose');
const validator = require('validator');

const LoginSchema = new mongoose.Schema({
    email:{type:String, required:true},
    password:{type:String, required:true}
});

const LoginModel = new mongoose.model('Login',LoginSchema);

class Login {
    constructor(body){
        this.body = body;
        this.errors = [];
        this.user = null;
    }

    async register(){
        this.validate();

        if(this.errors.lenght > 0){
            return;
        }
        try{
            this.user = await LoginModel.create(this.body);
        }
        catch(e){
            console.log(e);
        }    
    }    

    validate(){
        //Validate email e password;
        this.cleanUp();

        if(!validator.isEmail(this.body.email)){
            this.errors.push('Email inválido');
        }

        const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!!#@%&]).{6,15}$/;
        if(!regex.test(this.body.password)){
            this.errors.push('Senha precisa ter entre 3 e 15 caracteres.');
        }
    }   

    cleanUp(){
        for(const key in this.body){
          if(typeof this.body[key] !== 'string'){
            this.body[key] = '';
          }
        }

        this.body = {
           email: this.body.email,
           password: this.body.password
        };
    }   
}

module.exports = Login;