const express = require('express')
const router = express.Router()
const Pizzas = require('../model/pizza')

//get all the pizza
router.get('/',async(req,res)=>{
    let searchOptions = {}
  if (req.query.name != null && req.query.name !== '') {
    searchOptions.name = new RegExp(req.query.name, 'i')
  }
    try{
        const pizzas = await Pizzas.find(searchOptions)
         res.render('pizzas/index',
         {pizza:pizzas, 
            searchOptions:req.query
        })

    }catch{
        res.redirect('/')
    }
   
});

//new pizza router
router.get('/new',(req,res)=>{
    res.render('pizzas/new',{ pizzas :new Pizzas()})
})
//creaate pizza router

router.post('/', async(req,res)=>{
    const pizza = new Pizzas({
        name: req.body.name
    })
    try{
        const newPizza = await pizza.save()
        //res.redirect(`pizzas/${newPizza.id}`)
        res.redirect('pizzas')
    }catch{
        res.render('pizzas/new',{
            pizzas:pizza,
            errorMessage:'Error creating a pizza'
        })
    }
    
    
    
    
})

module.exports = router 