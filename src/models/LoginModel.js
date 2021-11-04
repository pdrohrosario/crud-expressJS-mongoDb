const mongoose = require('mongoose');
const validator = require('validator');
const bcryptjs = require('bcryptjs');

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

        if(this.errors.length > 0){
            return;
        }

        await this.userExists();

        console.log(this.errors);
        console.log(this.errors.lenght);

        if(this.errors.length > 0){
            return;
        }
    
        //password
        const salt = bcryptjs.genSaltSync();
        this.body.password = bcryptjs.hashSync(this.body.password, salt);

        this.user = await LoginModel.create(this.body);
       
    }    

    async login(){
        this.validate();
        if(this.errors.length > 0){
            return;
        }
        this.user = await LoginModel.findOne({ email: this.body.email});
        
        if(!this.user){
            this.errors.push('Usuário não existe.');
            return
        }

        if(!bcryptjs.compareSync(this.body.password, this.user.password)){
            this.errors.push('Senha inválida.');
            this.user = null;
            return;
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

    async userExists(){
        const user = await LoginModel.findOne({ email: this.body.email});
        if(user){
            this.errors.push('Usuário já existe.');
        }
    }
}

module.exports = Login;