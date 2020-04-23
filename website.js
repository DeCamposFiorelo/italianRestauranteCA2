
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const indexRouter = require('./router/index')
const mongoose = require('mongoose')
require('dotenv').config();
//connect to the database(Im using env to hide the credentials)- Mikhail showed in class
mongoose.connect(process.env.DATABASE_URL,{
    useNewUrlParser:true,
    useUnifiedTopology: true 
})
const db = mongoose.connection
db.on('error',error=>console.error(error))
db.once('open',()=>console.log("connected to Mongoo"))

app.set('view engine','ejs')//Im using the ejs for view engine
app.set('views',__dirname +'/views')//where my views is comming from
app.set('layout','layouts/layout')//every file it will be put inside the layout
app.use(expressLayouts)
app.use(express.static('public'))//files,javascript,image

app.use('/',indexRouter)// index page

const Port = process.env.Port || 3000;// port to use

app.listen(Port, () => console.log('Server started'))//server started