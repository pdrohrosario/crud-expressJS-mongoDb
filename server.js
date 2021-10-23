require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTIONSTRING,{useNewUrlParser:true, useUnifiedTopology:true})
    .then(() =>{
        app.emit('start');
    })
    .catch(e => console.log(e));

const routes = require('./routes');
const path = require('path');
const { middlewareGlobal, checkCsrfError, csrfMiddleware} = require('./src/middleware/middleware');
const helmet = require('helmet');
const csrf = require('csurf');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');


//Configurar a sessão
const sessionOptions = session({
    secret:'dasdadwadfefdsasd a()',
    resave: false,
    saveUninitialized:false,
    cookie : { 
        maxAge : 1000 * 60 * 60 * 24 * 7,
        httpOnly : true
    },
    store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING})
})

app.use(helmet());
app.use(sessionOptions);
app.use(flash());

app.use(express.urlencoded(
    {
        extended:true
    }
));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.resolve(__dirname,'public')))

app.set('views', path.resolve(__dirname,'src','views'));
app.set('view engine','ejs');

//outros middleware
app.use(csrf());
//Meus middlewares
app.use(checkCsrfError);
app.use(csrfMiddleware);
app.use(routes);
app.use(middlewareGlobal);

app.on('start', ()=> {
    app.listen(3000, () => {
        console.log('Acessar: http://localhost:3000');
    });  
})


