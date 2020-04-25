if(process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ path: '.env' })
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
app.use(express.static('public'))
const indexRouter = require('./router/index')
const pizzaRouter = require('./router/pizzas')



//connect to the database(Im using env to hide the credentials)- Mikhail showed in class




app.set('view engine','ejs')//Im using the ejs for view engine
app.set('views',__dirname +'/views')//where my views is comming from
app.set('layout','layouts/layout')//every file it will be put inside the layout
app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(express.static('public'))//files,javascript,image
app.use(bodyParser.urlencoded({limit:'10mb', extended:false}))
app.use('/',indexRouter)// index page
app.set('public', __dirname + '/public');

app.listen(process.env.PORT || 3000)
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true,useUnifiedTopology: true,useCreateIndex : true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))

app.use('/pizzas',pizzaRouter)
