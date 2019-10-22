require('./models/db'); //Digunakan untuk mendeteksi schema untuk mongoose

const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars'); //This view engine uses sensible defaults that leverage the "Express-way" of structuring an app's views
const bodyparser = require('body-parser'); //modul parser variable2 postnya bisa diambil dgn mudah sebagai parameter



var app = express();

//=========== Library Express untuk body parser =============
app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());
//==========================================================


//===================== Body parser untuk view ==============
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/' }));
app.set('view engine', 'hbs');
//===========================================================


// ==================== ENGINE TO START SERVER ==============
app.listen(3000, () => {
    console.log('Express server started at port : 3000')
});

const todolist = require('./routes/todolistRouter');
const home = require('./routes/homeRouter');


app.use('/', home);
app.use('/todolist', todolist);