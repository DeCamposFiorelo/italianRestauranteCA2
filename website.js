const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const indexRouter = require('./router/index')

app.set('view engine','ejs')//Im using the ejs for view engine
app.set('views',__dirname +'/views')//where my views is comming from
app.set('layout','layouts/layout')//every file it will be put inside the layout
app.use(expressLayouts)
app.use(express.static('public'))//files,javascript,image

app.use('/',indexRouter)
const Port = process.env.Port || 3000;

app.listen(Port, () => console.log('Server started'))