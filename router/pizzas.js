const express = require('express')
const router = express.Router()
const pizzas = require('../model/pizzas')

//get all the pizza
router.get('/',(req,res)=>{
    res.render('pizzas/index')//it will send to the index page when the web start
});

//new pizza router
router.get('/new',(req,res)=>{
    res.render('pizzas/new',{ pizzas:new pizzas()})
})
//creaate pizza router
router.post('/',(req,res)=>{
    const pizza = new pizzas({
        item: req.body.item
    })
    pizza.save((err,newPizzas)=>{
        if(err){
            res.render('pizzas/new',{
                pizzas:pizzas,
                errorMessage:'Error creating the pizza'
            })
            
        }else{
            //res.redirect('pizzas/${newPizzas.id}')
            res.redirect('pizzas')
        }
    })
    
})

module.exports = router 