
const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser')
const indexRouter = require('./router/index')
const pizzaRouter = require('./router/pizzas')
const mongoose = require('mongoose')
require('dotenv').config();
//connect to the database(Im using env to hide the credentials)- Mikhail showed in class

const connectDB = async () => {
  await mongoose.connect(process.env.DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify:false
  });
  console.log('db connected..!');
};


app.set('view engine','ejs')//Im using the ejs for view engine
app.set('views',__dirname +'/views')//where my views is comming from
app.set('layout','layouts/layout')//every file it will be put inside the layout
app.use(expressLayouts)
app.use(express.static('public'))//files,javascript,image
app.use(bodyParser.urlencoded({limit:'10mb', extended:false}))
app.use('/',indexRouter)// index page
app.use('/pizzas',pizzaRouter)

const Port = process.env.Port || 3000;// port to use

app.listen(Port, () => console.log('Server started'))//server started