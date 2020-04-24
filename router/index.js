const express = require('express')
const router = express.Router()
const Pizza = require('../model/pizza')

router.get('/',async(req,res)=>{
   let pizzas= []
   try{
    pizzas = await Pizza.find()
   }catch{
    pizzas=[]
   }
    res.render('index',{pizza:pizzas})//it will send to the index page when the web start
});

module.exports = router 